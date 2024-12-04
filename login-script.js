// Handle sign-up process (just a basic example, ideally, you would store this info in a database)
function signUp(event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // For simplicity, we store the username and password in cookies (in a real application, you would store this in a database)
  document.cookie = `username=${username}; path=/; expires=Thu, 01 Jan 2025 00:00:00 UTC`;
  document.cookie = `password=${password}; path=/; expires=Thu, 01 Jan 2025 00:00:00 UTC`;

  alert("Account created successfully! Please login now.");
  showLogin();
}

// Handle login process
function login(event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Get stored cookies
  const storedUsername = getCookie("username");
  const storedPassword = getCookie("password");

  if (username === storedUsername && password === storedPassword) {
    // If the credentials match, set the isLoggedIn cookie
    document.cookie = `isLoggedIn=true; path=/; expires=Thu, 01 Jan 2025 00:00:00 UTC`;

    // Redirect to the game page
    window.location.href = "play-game.html";
  } else {
    alert("Invalid login credentials");
  }
}

// Utility function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Show login form
function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Show sign-up form
function showSignUp() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}
