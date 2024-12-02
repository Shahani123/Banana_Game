window.onload = function() {
    let progress = 0;
    const progressBar = document.getElementById("progress-bar");
    const loadingText = document.getElementById("loading-text");
  
    const loadingInterval = setInterval(() => {
        if (progress < 100) {
            progress++;
            progressBar.style.width = `${progress}%`;
            loadingText.textContent = `Loading... ${progress}%`;
        } else {
            clearInterval(loadingInterval);
            // Redirect to the main game page once loading is complete
            window.location.href = "index.html"; // Ensure this path is correct
        }
    }, 50); // Adjust speed as needed
  };
  