<?php
// Read POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data)) {
    $file = fopen('cart.csv', 'a'); // Open CSV file for appending
    foreach ($data as $item) {
        fputcsv($file, $item); // Write each cart item to the file
    }
    fclose($file); // Close the file
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
}
?>
