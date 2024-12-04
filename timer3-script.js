// Function to start the timer
function startTimer(initialTime) {
  let timer = initialTime; // Set the initial time based on the passed parameter
  const timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `${timer}s`; // Update the timer display

    if (timer <= 0 || lives <= 0) {
      // End game if time runs out or lives are zero
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000); // Update every second
}
