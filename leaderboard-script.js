// Display leaderboard automatically when the page loads
function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardTable = document.getElementById("leaderboard");
  
    // Clear the current leaderboard table
    leaderboardTable.innerHTML = "";
  
    // Loop through the leaderboard and display each entry
    leaderboard.forEach((entry, index) => {
      const row = document.createElement("tr");
      const rank = document.createElement("td");
      const player = document.createElement("td");
      const score = document.createElement("td");
  
      rank.textContent = index + 1;  // Display the rank (1-based index)
      player.textContent = entry.name;
      score.textContent = entry.score;
  
      row.appendChild(rank);
      row.appendChild(player);
      row.appendChild(score);
      leaderboardTable.appendChild(row);
    });
  }
  
  // Call displayLeaderboard on page load to show the current leaderboard
  window.onload = displayLeaderboard;
  
  