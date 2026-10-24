<?php
// Free-trial form handler for Namecheap shared hosting.
// Frontend POSTs JSON to /api/trial; .htaccess rewrites it here.
// Response shape matches services/api.ts TrialSubmitResult.
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
$course = clean_str($input['courseInterest'] ?? '', 100);
$age = clean_str($input['ageGroup'] ?? '', 60);
$time = clean_str($input['time'] ?? '', 80);
$teacher = clean_str($input['teacherPreference'] ?? '', 40);
$notes = clean_str($input['notes'] ?? '', 2000);

$days = array();
if (isset($input['days']) && is_array($input['days'])) {
    foreach (array_slice($input['days'], 0, 7) as $day) {
        if (is_string($day)) {
            $days[] = clean_str($day, 20);
        }
    }
}

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
    $errors['phone'] = 'WhatsApp number is required.';
} elseif (mb_strlen(phone_digits($phone)) < 8) {
    $errors['phone'] = 'Please enter a valid WhatsApp number with country code.';
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
    'courseInterest' => $course,
    'ageGroup' => $age,
    'days' => $days,
    'time' => $time,
    'teacherPreference' => $teacher,
    'notes' => $notes,
);
save_submission('trial', $data);

$body = "New free trial request - Alif Laam Meem Academy\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone / WhatsApp: " . $phone . "\n";
$body .= "Country: " . $country . "\n";
$body .= "Course: " . $course . "\n";
$body .= "Age group: " . $age . "\n";
$body .= "Preferred days: " . implode(', ', $days) . "\n";
$body .= "Preferred time: " . $time . "\n";
$body .= "Teacher preference: " . $teacher . "\n";
$body .= "Notes: " . $notes . "\n";

$mailed = send_admin_email('New free trial request - ' . $name, $body, $email);

json_response(200, array(
    'success' => true,
    'message' => 'Thank you! Your free trial request has been received. Our team will contact you within 24 hours to confirm your slot.',
    'adminNotified' => (bool) $mailed,
    'confirmationSent' => false,
));
