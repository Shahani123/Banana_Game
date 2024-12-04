<?php
include 'db.php';  // Include the database connection file

$sql = "SELECT player_name, score FROM Leaderboard ORDER BY score DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rank = 1;
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $rank++ . "</td>";
        echo "<td>" . htmlspecialchars($row['player_name']) . "</td>";
        echo "<td>" . $row['score'] . "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='3'>No data found</td></tr>";
}

$conn->close();
?>
