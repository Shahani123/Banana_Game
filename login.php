<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login / Sign Up</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="login">

  <div class="container">
    <div class="form-container" id="login-form">
      <h2>Login</h2>
      <form onsubmit="login(event)">
        <input type="text" id="login-username" placeholder="Username" required>
        <input type="password" id="login-password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="#" onclick="showSignUp()">Sign Up</a></p>
    </div>

    <div class="form-container" id="signup-form" style="display: none;">
      <h2>Sign Up</h2>
      <form onsubmit="signUp(event)">
        <input type="text" id="signup-username" placeholder="Username" required>
        <input type="email" id="signup-email" placeholder="Email" required>
        <input type="password" id="signup-password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="#" onclick="showLogin()">Login</a></p>
    </div>
  </div>

  <script src="login-script.js"></script>
</body>
</html>
