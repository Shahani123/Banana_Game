<?php
$servername = "localhost";  // or the server hosting your database
$username = "root";     // your MySQL username
$password = "";     // your MySQL password
$dbname = "GameLeaderboard";  // the name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
