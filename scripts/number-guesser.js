document.addEventListener("DOMContentLoaded", function () {
  // Initialize game variables
  const minNumber = 1;
  const maxNumber = 100;
  let targetNumber = generateRandomNumber(minNumber, maxNumber);
  let attempts = 0;

  let wins = 0;
  let losses = 0;
  let gameIsOver = false; // Flag to track game state

  // Get elements from the DOM
  const guessInput = document.getElementById("guess");
  const submitButton = document.getElementById("submit");
  const message = document.getElementById("message");
  const winsDisplay = document.getElementById("wins");
  const lossesDisplay = document.getElementById("losses");
  const timerDisplay = document.getElementById("timer");

  let timer = null; // Timer variable
  let secondsRemaining = 30; // Set the time in seconds here

  // Event listener for the guess input field
  guessInput.addEventListener("click", function () {
    if (!gameIsOver) {
      startTimer();
    } else {
      guessInput.blur(); // Remove focus from the input field
      guessInput.value = ""; // Clear the input field
    }
  });

  // Function to reset the game and refresh the page
  function resetGame() {
    targetNumber = generateRandomNumber(minNumber, maxNumber);
    attempts = 0;
    guessInput.value = "";
    guessInput.readOnly = false;
    secondsRemaining = 30;
    timerDisplay.textContent = `Time Left: ${secondsRemaining} seconds`;
    gameIsOver = false;
    guessInput.focus();

    // Check if the game is over
    if (attempts >= 10) {
      // Game is over, refresh the page after a short delay (e.g., 2 seconds)
      setTimeout(function () {
        location.reload(); // Reload the page
      }, 1000); // Adjust the delay as needed
    }
  }

  // Event listener for the submit button
  submitButton.addEventListener("click", checkGuess);

  // Function to start the timer
  function startTimer() {
    if (!timer) {
      timer = setInterval(updateTimer, 1000);
    }
  }

  // Function to update and display the timer
  function updateTimer() {
    secondsRemaining--;
    timerDisplay.textContent = `⏳ ${secondsRemaining} seconds`;

    if (secondsRemaining <= 0 || attempts >= 10) {
      clearInterval(timer);
      timer = null;
      showMessage("Time's up!");
      losses++;
      lossesDisplay.textContent = losses;
      reloadPage();
      guessInput.blur(); // Remove focus from the input field
    } else if (!gameIsOver) {
      startTimer(); // Start the timer again if the game is not over
    }
  }

  // Function to check the user's guess
  function checkGuess() {
    if (gameIsOver) return; // Don't check if the game is already over

    const userGuess = parseInt(guessInput.value);

    if (!userGuess || userGuess < minNumber || userGuess > maxNumber) {
      showMessage("Please enter a valid number within the range.");
    } else {
      attempts++;

      if (userGuess === targetNumber) {
        clearInterval(timer); // Stop the timer
        timer = null;
        showMessageWithFade(
          `Congratulations! You guessed the correct number (${targetNumber}) in ${attempts} attempts.`
        );
        wins++;
        winsDisplay.textContent = wins;
        gameIsOver = true; // Game is over
        guessInput.readOnly = false;
        reloadPage();
      } else if (attempts >= 10) {
        clearInterval(timer); // Stop the timer
        timer = null;
        showMessageWithFade(
          `Sorry, you've reached the maximum number of attempts. The correct number was ${targetNumber}.`
        );
        losses++;
        lossesDisplay.textContent = losses;
        gameIsOver = true; // Game is over
        guessInput.readOnly = false;
        reloadPage();
      } else {
        const hint = userGuess < targetNumber ? "higher" : "lower";
        showMessageWithFade(`Try again. The correct number is ${hint}.`);
      }
    }
  }

  // Function to reload the page
  function reloadPage() {
    setTimeout(function () {
      location.reload();
    }, 6000); // Reload the page after a delay
  }

  // Function to show messages with a fade effect
  function showMessageWithFade(messageText) {
    message.style.transition = "opacity 0.3s";
    message.style.opacity = "0";
    setTimeout(() => {
      message.textContent = messageText;
      message.style.transition = "opacity 0.3s";
      message.style.opacity = "1";
    }, 300);
  }

  // Function to show messages without a fade effect
  function showMessage(messageText) {
    message.textContent = messageText;
  }

  // Function to generate a random number between min and max (inclusive)
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Rest of the code...

  // Function to reset the game
  function resetGame() {
    targetNumber = generateRandomNumber(minNumber, maxNumber);
    attempts = 0;
    guessInput.value = "";
  }
});

// Get references to the input field and the submit button
const inputField = document.getElementById("guess");
const submitButton = document.getElementById("submit");

// Add an event listener to the input field to listen for "Enter" key press
inputField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // If "Enter" key is pressed, trigger a click event on the submit button
    submitButton.click();
  }
});

// Reset guess input box after a number entered
document.addEventListener("DOMContentLoaded", function () {
  const guessInput = document.getElementById("guess");
  const submitButton = document.getElementById("submit");
  const message = document.getElementById("message");

  submitButton.addEventListener("click", function () {
    const userGuess = guessInput.value;
    // Add the code to handle the guess, e.g., compare it to the correct answer
    // Display the result in the 'message' element

    // Reset the input field
    guessInput.value = "";
  });
});

//Dropdown menu
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".link");
  const content = dropdown.querySelector(".dropdown-content");
  let timeout;

  // Show the dropdown when the mouse enters the "Games" tab
  button.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
    content.style.display = "block";
  });

  // Hide the dropdown when the mouse leaves the dropdown tab
  dropdown.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      content.style.display = "none";
    }, 500); // Adjust the delay time as needed
  });

  // Cancel the timeout and keep the menu open when the mouse enters the dropdown
  dropdown.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
  });

  // Click to toggle the dropdown
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the link from navigating
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });

  content.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the dropdown from closing when clicking on an item
  });
});
