// Elements and Initial Setup
const boy = document.getElementById("boy");
const backgroundMusic = document.getElementById("backgroundMusic");
const bananaLives = document.getElementById("bananaLives");
const progressBar = document.getElementById("progress-bar");
const loadingText = document.getElementById("loading-text");
const banana = document.getElementById("banana");
const button = document.getElementById("myButton"); // Replace with the actual button id
const gameSquare = document.getElementById("gameSquare"); // The moving square
const moveButton = document.getElementById("moveButton"); // Button that triggers the square movement

let idleImageNumber = 0;
let solution;
let timer = 60; // Default starting time (can be updated later based on difficulty)
let lives = 3;
let currentLevel = 1;
let score = 0;
let progress = 0;
let cursorOnBanana = false;
let buttonHideTimeout;

// Set initial volume for background music
backgroundMusic.volume = 0.5;

// Function to update banana lives
function updateLives() {
  bananaLives.textContent = "🍌".repeat(lives);
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

// Function to play or resume background music
function playMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch((error) => {
      console.error("Error playing music:", error);
    });
  }
}

// Toggle music mute/unmute
function toggleMute() {
  backgroundMusic.muted = true;
  document.getElementById("muteBtn").style.display = "none";
  document.getElementById("unmuteBtn").style.display = "inline";
}

// Toggle music unmute
function toggleUnmute() {
  backgroundMusic.muted = false;
  document.getElementById("muteBtn").style.display = "inline";
  document.getElementById("unmuteBtn").style.display = "none";
}

// Adjust background music volume
function adjustVolume(value) {
  backgroundMusic.volume = value;
}

// Idle animation for the character
function idleAnimation() {
  idleImageNumber = (idleImageNumber % 3) + 1; // Cycle through images 1-10
  boy.src = `resources/idle (${idleImageNumber}).png`;
}

// Function to start idle animation and game
function idleAnimationStart() {
  loadQuestion();
  setInterval(idleAnimation, 200);
  playMusic();
  startTimer();
  updateLives();
}

// Handle user interactions to autoplay music
document.body.addEventListener("click", playMusic);
document.body.addEventListener("keypress", playMusic);

// Function to load a question from the API
function loadQuestion() {
  const apiURL = "https://marcconrad.com/uob/banana/api.php";

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("questionImage").src = data.question;
      solution = data.solution;
      console.log("Solution", solution);
    })
    .catch((error) => {
      console.error("Error fetching question from API:", error);
    });
}

// Function to check the user's answer
function checkAnswer(level) {
  console.log("level", level);

  const userAnswer = parseInt(document.getElementById("answerInput").value);

  if (userAnswer === solution) {
    updateFeedback("Correct!", "green");
    score += 10;
    currentLevel++;
    updateStatus();
    playSound("correct_answer");
  } else {
    updateFeedback("Incorrect!", "red");
    lives--;
    updateLives();
    playSound("wrong_answer");

    if (lives <= 0) {
      endGame();
      return; // Stop further actions when the game ends
    }
  }
  updateMarks();
  loadQuestion(); // Load a new question regardless of the answer
}

// Function to update feedback text and color
function updateFeedback(message, color) {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = message;
  feedbackElement.style.color = color;
}

// Update level and score on the UI
function updateStatus() {
  document.getElementById("level").textContent = currentLevel;
  document.getElementById("score").textContent = score;
}

// Function to play sound
function playSound(sound) {
  const audio = new Audio(`assets/audio/${sound}.mp3`);
  audio.play();
}

// Restart the game
function restartGame() {
  // Reset all variables
  lives = 3;
  currentLevel = 1;
  score = 0;
  progress = 0;

  // Reset UI
  document.getElementById("timer").textContent = `${timer}s`;
  updateLives();
  document.getElementById("level").textContent = currentLevel;
  document.getElementById("score").textContent = score;
  document.getElementById("feedback").textContent = "";
  document.getElementById("playAgainBtn").style.display = "none"; // Hide Play Again button
  document.getElementById("mainMenuBtn").style.display = "none"; // Hide Main Menu button
  document.getElementById("submitAnswer").disabled = false;

  // Restart the game
  loadQuestion();
  startTimer();
  playMusic();
}

// Redirect to main menu (play-game.html)
function goToMainMenu() {
  window.location.href = "play-game.html"; // Redirect to the play-game.html page
}

// Event listeners for difficulty buttons
document.getElementById("startEasy").addEventListener("click", function () {
  setTimerForLevel("easy");
});
document.getElementById("startMedium").addEventListener("click", function () {
  setTimerForLevel("medium");
});
document.getElementById("startHard").addEventListener("click", function () {
  setTimerForLevel("hard");
});

// Add the event listener for the playButton
document.getElementById("playButton").addEventListener("click", function () {
  window.location.href = "loading.html"; // Redirect to loading.html
});

// Function to hide the button when the cursor is on the banana
function hideButtonOnBanana() {
  button.style.display = "none"; // Hide the button

  // Revert after 2 seconds if cursor remains on the banana
  buttonHideTimeout = setTimeout(() => {
    if (cursorOnBanana) {
      button.style.display = "none"; // Keep the button hidden
    }
  }, 2000);
}

// Event listener for when the cursor enters the banana area
banana.addEventListener("mouseover", () => {
  cursorOnBanana = true;
  hideButtonOnBanana(); // Start the hide button timeout
});

// Event listener for when the cursor leaves the banana area
banana.addEventListener("mouseout", () => {
  cursorOnBanana = false;
  clearTimeout(buttonHideTimeout); // Clear timeout to avoid unintentional button hide
  button.style.display = "inline"; // Show the button again when cursor leaves the banana
});

// Move the square to a new random position when the button is clicked
moveButton.addEventListener("click", () => {
  const randomX = Math.random() * (window.innerWidth - 100); // Random X position within the window
  const randomY = Math.random() * (window.innerHeight - 100); // Random Y position within the window

  gameSquare.style.position = "absolute"; // Ensure the position is absolute
  gameSquare.style.left = `${randomX}px`;
  gameSquare.style.top = `${randomY}px`;

  // Focus on the moved square
  gameSquare.scrollIntoView({ behavior: "smooth", block: "center" });
});

//****************************************************************** */

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

function updateMarks() {
  console.log("Update marks");

  // Function to get a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const userName = getCookie("username"); // Assuming the cookie name is 'username'
  if (!userName) {
    console.error("Username not found in cookies");
    return;
  }
  console.log("username", userName);

  var xhr = new XMLHttpRequest();
  var updateMarksUrl = "update_score.php";
  var data = "userName=" + encodeURIComponent(userName) + "&newMarks=" + score;

  xhr.open("POST", updateMarksUrl, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("Marks updated successfully");
    }
  };

  xhr.send(data);
}

function submitScore(playerName, score) {
  fetch("update_score.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `player_name=${encodeURIComponent(
      playerName
    )}&score=${encodeURIComponent(score)}`,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Debug response
      if (data.includes("successfully")) {
        alert("Score submitted!");
        window.location.reload(); // Reload leaderboard
      } else {
        alert("Failed to update score: " + data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
