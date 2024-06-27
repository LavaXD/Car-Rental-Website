<?php
include 'conn.php';

$currentTime = $_GET['currentTime'];
$name = $_GET['name'];
$number = $_GET['number'];
$email = $_GET['email'];
$carName = $_GET['carName'];
$carImg = $_GET['carImg'];
$pickup = $_GET['pickup'];
$return = $_GET['return'];
$qty = $_GET['qty'];
$subtotal = $_GET['subtotal'];

$sql = "INSERT INTO `Order` (currentTime,fullName, mobileNumber, email, carName,carImg, pickupDate,returnDate,qty,subtotal) VALUES ('$currentTime','$name','$number','$email','$carName','$carImg','$pickup','$return','$qty','$subtotal');";

$conn->query($sql);

echo 'Order submitted successfully!';
?>