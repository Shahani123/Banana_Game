// Elements and Initial Setup
const boy = document.getElementById("boy");
const backgroundMusic = document.getElementById("backgroundMusic");
const bananaLives = document.getElementById("bananaLives");
const progressBar = document.getElementById("progress-bar");
const loadingText = document.getElementById("loading-text");

let idleImageNumber = 0;
let solution;
let timer = 60;
let lives = 3;
let currentLevel = 1;
let score = 0;
let progress = 0;

// Set initial volume for background music
backgroundMusic.volume = 0.5;

// Function to update banana lives
function updateLives() {
  bananaLives.textContent = "🍌".repeat(lives);
}

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
  idleImageNumber = (idleImageNumber % 10) + 1; // Cycle through images 1-10
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
    })
    .catch((error) => {
      console.error("Error fetching question from API:", error);
    });
}

// Function to check the user's answer
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answerInput").value);

  if (userAnswer === solution) {
    document.getElementById("feedback").textContent = "Correct!";
    document.getElementById("feedback").style.color = "green";
    score += 10;
    currentLevel++;
    updateStatus();
    playCorrectAnswerSound(); // Play sound for correct answer
    loadQuestion();
  } else {
    document.getElementById("feedback").textContent = "Incorrect!";
    document.getElementById("feedback").style.color = "red";
    lives--;
    updateLives();
    playWrongAnswerSound(); // Play sound for wrong answer
    if (lives <= 0) {
      endGame();
    }
  }
}

// Update level and score on the UI
function updateStatus() {
  document.getElementById("level").textContent = currentLevel;
  document.getElementById("score").textContent = score;
}

// Function to play correct answer sound
function playCorrectAnswerSound() {
  const correctAnswerSound = new Audio("assets/audio/correct_answer.mp3");
  correctAnswerSound.play();
}

// Function to play wrong answer sound
function playWrongAnswerSound() {
  const wrongAnswerSound = new Audio("assets/audio/wrong_answer.mp3");
  wrongAnswerSound.play();
}

// Restart the game
function restartGame() {
  // Reset all variables
  timer = 60;
  lives = 3;
  currentLevel = 1;
  score = 0;
  progress = 0;

  // Reset UI
  document.getElementById("timer").textContent = `${timer}s`;
  document.getElementById("bananaLives").textContent = "🍌🍌🍌";
  document.getElementById("level").textContent = currentLevel;
  document.getElementById("score").textContent = score;
  document.getElementById("feedback").textContent = "";
  document.getElementById("playAgainBtn").style.display = "none"; // Hide Play Again button
  document.getElementById("mainMenuBtn").style.display = "none"; // Hide Main Menu button
  document.getElementById("submitAnswer").disabled = false;

  // Restart the game
  loadQuestion();
  startTimer();
  updateLives();
  playMusic();
}

// Redirect to main menu (play-game.html)
function goToMainMenu() {
  window.location.href = "play-game.html"; // Redirect to the play-game.html page
}
