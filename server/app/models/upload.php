<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        $uploadDir = 'upload/';
        $uploadFile = $uploadDir . basename($_FILES['file']['name']);

        // Check if directory exists, if not create it
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
            echo json_encode(['message' => 'File uploaded successfully']);
        } else {
            echo json_encode(['message' => 'File upload failed']);
        }
    } else {
        echo json_encode(['message' => 'No file uploaded or there was an error']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
?>