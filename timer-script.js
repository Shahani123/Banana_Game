let countdown; // Declare the countdown variable globally
let isGameOver = false; // Flag to check if the game is over

document.addEventListener("DOMContentLoaded", function () {
  let timeLeft = 60; // Set the starting timer value
  const timerElement = document.getElementById("timer");

  // Only start the timer if the game is not over
  if (!isGameOver) {
    startTimer(timeLeft, timerElement);
  }
});

// Function to start the countdown
function startTimer(timeLeft, timerElement) {
  // Display the initial timer value
  timerElement.textContent = `${timeLeft}s`;

  countdown = setInterval(() => {
    if (isGameOver) {
      clearInterval(countdown); // Ensure the timer is stopped if the game is over
      return;
    }

    timeLeft--; // Decrement the time left
    timerElement.textContent = `${timeLeft}s`; // Update the timer display

    // If time runs out, stop the timer and end the game
    if (timeLeft <= 0) {
      clearInterval(countdown); // Stop the timer
      alert("Game Over! Time's up!");
      gameOver(); // Call game over function
    }
  }, 1000); // Update every second
}

// Function to handle what happens when the game is over
function gameOver() {
  isGameOver = true; // Set the game over flag to true

  // Stop the countdown when the game ends
  clearInterval(countdown);

  // Hide the timer display
  document.getElementById("timer").style.display = "none";

  // Show Play Again and Main Menu buttons
  document.getElementById("playAgainBtn").style.display = "block";
  document.getElementById("mainMenuBtn").style.display = "block";

  // Additional game-over logic (reset scores, etc.) can be placed here
}
