<?php
// Shared helpers for the shared-hosting (Hostinger) form handlers.
// These handlers replace Netlify Functions / the Express server on Apache
// hosting, where /api/trial and /api/contact do not run. The frontend
// (services/api.ts) still POSTs JSON to /api/trial and /api/contact;
// .htaccess rewrites those URLs to api/trial.php and api/contact.php.
//
// If this file is opened directly in a browser, it does nothing.
if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    http_response_code(403);
    exit;
}

define('ADMIN_EMAIL', 'infoaliflaameem@gmail.com');
define('MAIL_FROM', 'noreply@aliflaammeeminstitute.online');
define('MAIL_FROM_NAME', 'Alif Laam Meem Academy');

function json_response($status, $data) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function clean_str($value, $max) {
    if (!is_string($value)) {
        return '';
    }
    $value = trim(strip_tags($value));
    // Prevent mail header injection: no newlines in header fields.
    $value = str_replace(array("\r", "\n"), ' ', $value);
    return mb_substr($value, 0, $max);
}

function read_json_body() {
    $raw = file_get_contents('php://input');
    if ($raw !== false && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return $_POST;
}

function is_valid_email($email) {
    return (bool) preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', $email);
}

function phone_digits($phone) {
    return preg_replace('/\D/', '', $phone);
}

/**
 * Save every submission to a log file as a backup, even if mail fails.
 * The log file starts with "<?php exit; ?>" so opening it in a browser
 * shows nothing; the admin can download it from cPanel File Manager.
 */
function save_submission($type, $data) {
    $file = __DIR__ . '/submissions.log.php';
    if (!file_exists($file)) {
        file_put_contents($file, "<?php exit; ?>\n");
    }
    $record = array(
        'type' => $type,
        'time' => gmdate('Y-m-d H:i:s'),
        'data' => $data,
    );
    @file_put_contents($file, json_encode($record) . "\n", FILE_APPEND | LOCK_EX);
}

function send_admin_email($subject, $body, $reply_to) {
    $headers = 'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . ">\r\n";
    $headers .= 'Reply-To: ' . $reply_to . "\r\n";
    $headers .= 'Content-Type: text/plain; charset=utf-8' . "\r\n";
    // mail() on Namecheap shared hosting sends from the hosting account.
    // Using a From address on the academy's own domain (not Gmail) is
    // the most likely to be accepted; check Spam/Junk if a mail is missing.
    return @mail(ADMIN_EMAIL, $subject, $body, $headers);
}

/**
 * Send a WhatsApp alert to the academy owner through the CallMeBot API.
 * The phone number and API key live in _wa_config.php, which the deploy
 * workflow writes from GitHub secrets (WHATSAPP_PHONE, WHATSAPP_APIKEY).
 * If the file or key is missing, this silently does nothing, so forms
 * keep working by email only.
 */
function send_whatsapp_alert($text) {
    $cfg_file = __DIR__ . '/_wa_config.php';
    if (!file_exists($cfg_file)) {
        return false;
    }
    $cfg = include $cfg_file;
    if (!is_array($cfg) || empty($cfg['phone']) || empty($cfg['apikey'])) {
        return false;
    }
    // CallMeBot has a message length limit; keep alerts short.
    $text = mb_substr($text, 0, 900);
    $url = 'https://api.callmebot.com/whatsapp.php?source=php'
        . '&phone=' . rawurlencode($cfg['phone'])
        . '&text=' . rawurlencode($text)
        . '&apikey=' . rawurlencode($cfg['apikey']);
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        $out = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return $out !== false && $code >= 200 && $code < 300;
    }
    $ctx = stream_context_create(array('http' => array('timeout' => 8)));
    return @file_get_contents($url, false, $ctx) !== false;
}

