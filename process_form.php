<?php
// process_form.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $_POST['name'] ?? '',
        'email' => $_POST['email'] ?? '',
        'phone' => $_POST['phone'] ?? '',
        'message' => $_POST['message'] ?? '',
        'page' => $_SERVER['HTTP_REFERER'] ?? 'unknown'
    ];

    // Sanitize data
    $formData = array_map('htmlspecialchars', $formData);

    // Path to your CSV file
    $file = 'form_submissions.csv';
    
    // Create file if it doesn't exist and add headers
    if (!file_exists($file)) {
        $headers = array_keys($formData);
        $fp = fopen($file, 'w');
        fputcsv($fp, $headers);
        fclose($fp);
    }
    
    // Append form data to CSV
    $fp = fopen($file, 'a');
    fputcsv($fp, $formData);
    fclose($fp);
    
    // Return success response
    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
    exit;
}
?>