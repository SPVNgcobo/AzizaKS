<?php
// Open the CSV file
$file = fopen('cart.csv', 'r');
$cartData = [];

// Read each line from the CSV file
while (($line = fgetcsv($file)) !== FALSE) {
    $cartData[] = $line; // Store each line in an array
}
fclose($file); // Close the file

// Output the data as JSON
header('Content-Type: application/json');
echo json_encode($cartData);
?>
