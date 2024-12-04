<?php
include("db.php");

$sql = "SELECT * FROM `leaderboard` ORDER BY `marks` DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = $result->fetch_all(MYSQLI_ASSOC);
} else {
    die("No data found in leaderboard.");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
</head>
<body>
    <h1>Leaderboard</h1>
    <table border="1">
        <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
        </tr>
        <?php
        $rank = 1;
        foreach ($data as $row) {
            echo "<tr>";
            echo "<td>" . $rank++ . "</td>";
            echo "<td>" . $row['userName'] . "</td>";
            echo "<td>" . $row['marks'] . "</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>
