<?php
include "conn.php";

$currentTime = $_GET['currentTime'];
$carName = $_GET['carName'];
$sql = "update `Order` set status = 'confirmed' where currentTime=$currentTime";

$conn->query($sql);


$jsonFile = 'cars.json';
$jsonData = file_get_contents($jsonFile);

// Decode JSON data into PHP array
$cars = json_decode($jsonData, true);

foreach ($cars as &$car) {
    if ($car['name'] === $carName) {

        $car['quantity'] = $car['quantity']+0-1;
        break;
    }
}

// Encode the updated array back to JSON format
$newJsonData = json_encode($cars, JSON_PRETTY_PRINT);

// Write the JSON data back to the file, replacing the original content
file_put_contents($jsonFile, $newJsonData);

echo "<script>alert('Order confirmed!');</script>";
echo "<script>location.href = 'index.html';</script>";
?>
