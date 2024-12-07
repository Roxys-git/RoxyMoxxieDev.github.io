// Default values
let breakLength = 5; // Break length in minutes
let sessionLength = 25; // Session length in minutes
let timeLeft = sessionLength * 60; // Remaining time in seconds
let isRunning = false; // Timer status
let isSession = true; // Session/Break status
let timerInterval; // Timer interval ID

// Helper functions
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
  const remainingSeconds = seconds % 60; // Get remaining seconds
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`; // Format as MM:SS
};

const updateDisplay = () => {
  // Update the display for break length, session length, and time left
  document.getElementById('break-length').innerText = breakLength;
  document.getElementById('session-length').innerText = sessionLength;
  document.getElementById('time-left').innerText = formatTime(timeLeft);
  document.getElementById('timer-label').innerText = isSession ? 'Session' : 'Break'; // Show 'Session' or 'Break' based on status
};

// Timer logic
const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1; // Decrease time by 1 second
    } else {
      const beep = document.getElementById('beep');
      beep.play(); // Play sound when the countdown reaches 00:00
      isSession = !isSession; // Toggle between session and break

      // Set the time for the new phase (session or break)
      timeLeft = (isSession ? sessionLength : breakLength) * 60;
    }
    updateDisplay(); // Update the display after each second
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval); // Stop the timer
};

// Event handlers
document.getElementById('break-decrement').addEventListener('click', () => {
  if (!isRunning && breakLength > 1) {
    breakLength -= 1; // Decrease break length
    if (!isSession) timeLeft = breakLength * 60; // Update time if currently in break phase
    updateDisplay(); // Update the display
  }
});

document.getElementById('break-increment').addEventListener('click', () => {
  if (!isRunning && breakLength < 60) {
    breakLength += 1; // Increase break length
    if (!isSession) timeLeft = breakLength * 60; // Update time if currently in break phase
    updateDisplay(); // Update the display
  }
});

document.getElementById('session-decrement').addEventListener('click', () => {
  if (!isRunning && sessionLength > 1) {
    sessionLength -= 1; // Decrease session length
    if (isSession) timeLeft = sessionLength * 60; // Update time if currently in session phase
    updateDisplay(); // Update the display
  }
});

document.getElementById('session-increment').addEventListener('click', () => {
  if (!isRunning && sessionLength < 60) {
    sessionLength += 1; // Increase session length
    if (isSession) timeLeft = sessionLength * 60; // Update time if currently in session phase
    updateDisplay(); // Update the display
  }
});

document.getElementById('start_stop').addEventListener('click', () => {
  if (isRunning) {
    stopTimer(); // Stop the timer if it's running
  } else {
    startTimer(); // Start the timer if it's stopped
  }
  isRunning = !isRunning; // Toggle the running status
});

document.getElementById('reset').addEventListener('click', () => {
  stopTimer(); // Stop the timer
  breakLength = 5; // Reset break length to default
  sessionLength = 25; // Reset session length to default
  timeLeft = sessionLength * 60; // Reset the time to the session length
  isRunning = false; // Set timer as not running
  isSession = true; // Start with session phase

  const beep = document.getElementById('beep');
  beep.pause(); // Pause the beep sound
  beep.currentTime = 0; // Reset the beep sound to the start

  updateDisplay(); // Update the display with the reset values
});

// Initial display update
updateDisplay();
