<?php
// Contact form handler for Namecheap shared hosting.
// Frontend POSTs JSON to /api/contact; .htaccess rewrites it here.
// Response shape matches services/api.ts ContactSubmitResult.
require __DIR__ . '/_common.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, array('success' => false, 'message' => 'Method not allowed.'));
}

$input = read_json_body();
$errors = array();

$name = clean_str($input['name'] ?? '', 120);
$email = clean_str($input['email'] ?? '', 254);
$phone = clean_str($input['phone'] ?? '', 40);
$country = clean_str($input['country'] ?? '', 100);
$subject = clean_str($input['subject'] ?? '', 120);
$message = clean_str($input['message'] ?? '', 5000);

if (mb_strlen($name) < 2) {
    $errors['name'] = 'Please enter your full name.';
}
if ($email === '') {
    $errors['email'] = 'Email address is required.';
} elseif (!is_valid_email($email)) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($country === '') {
    $errors['country'] = 'Please select your country.';
}
if ($phone === '') {
    $errors['phone'] = 'Phone or WhatsApp number is required.';
} elseif (mb_strlen(phone_digits($phone)) < 8) {
    $errors['phone'] = 'Please enter a valid phone number with country code.';
}

$allowed = array('trial', 'pricing', 'tutors', 'technical', 'other');
if ($subject === '') {
    $errors['subject'] = 'Please select a subject.';
} elseif (!in_array($subject, $allowed, true)) {
    $errors['subject'] = 'Please choose a valid subject.';
}
if (mb_strlen($message) < 10) {
    $errors['message'] = 'Please enter a message (at least 10 characters).';
}

if (!empty($errors)) {
    json_response(400, array(
        'success' => false,
        'message' => 'Please fix the highlighted fields and try again.',
        'errors' => $errors,
    ));
}

$data = array(
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'country' => $country,
    'subject' => $subject,
    'message' => $message,
);
save_submission('contact', $data);

$body = "New contact message - Alif Laam Meem Academy\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone / WhatsApp: " . $phone . "\n";
$body .= "Country: " . $country . "\n";
$body .= "Subject: " . $subject . "\n";
$body .= "Message:\n" . $message . "\n";

send_admin_email('New contact message - ' . $subject . ' - ' . $name, $body, $email);

json_response(200, array(
    'success' => true,
    'message' => 'Thank you! Your message has been received. We will reply within 24 hours.',
));
