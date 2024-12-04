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

// Fetch leaderboard data
$sql = "SELECT * FROM `Leaderboard` ORDER BY `score` DESC";
$result = mysqli_query($con, $sql);

// Check if the query succeeded
if (!$result) {
    die("Query failed: " . mysqli_error($con));
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/lboard.css" />
    <title>Leaderboard</title>
  </head>
  <body>
    <main>
      <div id="header">
        <h1>Ranking</h1>
        <button class="share">
          <i class="ph ph-share-network"></i>
        </button>
      </div>
      <div id="leaderboard">
        <div class="ribbon"></div>
        <table>
          <tr>
            <td class="number">Rank</td>
            <td></td>
            <td class="name">Username</td>
            <td class="points">Points</td>
          </tr>
          <?php
          $rank = 1;
          while ($row = mysqli_fetch_assoc($result)) {
              echo "<tr>";
              echo "<td class='number'>" . $rank . "</td>";
              echo "<td></td>";
              echo "<td class='name'>" . htmlspecialchars($row['player_name']) . "</td>";
              echo "<td class='points'>" . htmlspecialchars($row['score']) . "</td>";
              echo "</tr>";
              $rank++;
          }
          ?>
        </table>
        <div id="buttons">
          <p><a href="play-game.html"><button class="exit">Exit</button></a></p>
        </div>
      </div>
    </main>
  </body>
</html>
