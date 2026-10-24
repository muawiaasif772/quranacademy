<?php
// Shared helpers for the Namecheap shared-hosting form handlers.
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
