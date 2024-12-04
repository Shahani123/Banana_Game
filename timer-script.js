// Function to start the timer
function startTimer() {
  const timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `${timer}s`;

    if (timer <= 0 || lives <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Function to end the game
function endGame() {
  document.getElementById(
    "feedback"
  ).textContent = `Game Over! Your score: ${score}`;
  document.getElementById("feedback").style.color = "red"; // Change color to red
  document.getElementById("submitAnswer").disabled = true;
  document.getElementById("playAgainBtn").style.display = "block"; // Show the Play Again button
  document.getElementById("mainMenuBtn").style.display = "block"; // Show the Main Menu button
  backgroundMusic.pause();
}
