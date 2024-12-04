<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$con = mysqli_connect("localhost", "root", "", "GameLeaderboard");

// Check if the connection is successful
if (!$con) {
    die("Failed to connect to MySQL: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_POST["userName"];
    $newMarks = $_POST["newMarks"];

    // Check if the user already exists
    $checkQuery = "SELECT * FROM Leaderboard WHERE player_name = ?";
    $stmt = mysqli_prepare($con, $checkQuery);
    mysqli_stmt_bind_param($stmt, "s", $userName);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        // User exists, update their score
        $updateQuery = "UPDATE Leaderboard SET score = ? WHERE player_name = ?";
        $updateStmt = mysqli_prepare($con, $updateQuery);
        mysqli_stmt_bind_param($updateStmt, "is", $newMarks, $userName);
        if (mysqli_stmt_execute($updateStmt)) {
            echo json_encode(["success" => "Score updated successfully"]);
        } else {
            echo json_encode(["error" => "Error updating score: " . mysqli_error($con)]);
        }
        mysqli_stmt_close($updateStmt);
    } else {
        // User does not exist, insert new record
        $insertQuery = "INSERT INTO Leaderboard (player_name, score) VALUES (?, ?)";
        $insertStmt = mysqli_prepare($con, $insertQuery);
        mysqli_stmt_bind_param($insertStmt, "si", $userName, $newMarks);
        if (mysqli_stmt_execute($insertStmt)) {
            echo json_encode(["success" => "New record inserted successfully"]);
        } else {
            echo json_encode(["error" => "Error inserting record: " . mysqli_error($con)]);
        }
        mysqli_stmt_close($insertStmt);
    }

    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

mysqli_close($con);
?>
