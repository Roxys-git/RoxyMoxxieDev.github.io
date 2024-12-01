// Standardwerte
let breakLength = 5; // Pausenlänge in Minuten
let sessionLength = 25; // Sitzungsdauer in Minuten
let timeLeft = sessionLength * 60; // Verbleibende Zeit in Sekunden
let isRunning = false; // Timer-Status
let isSession = true; // Sitzungs-/Pausestatus
let timerInterval; // Intervall-ID für den Timer

// Hilfsfunktionen
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const updateDisplay = () => {
  document.getElementById('break-length').innerText = breakLength;
  document.getElementById('session-length').innerText = sessionLength;
  document.getElementById('time-left').innerText = formatTime(timeLeft);
  document.getElementById('timer-label').innerText = isSession ? 'Sitzung' : 'Pause';
};

// Timer-Logik
const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1;
    } else {
      const beep = document.getElementById('beep');
      beep.play(); // Ton abspielen, wenn der Countdown 00:00 erreicht
      isSession = !isSession; // Wechsel zwischen Sitzung und Pause

      // Setze die Zeit für die neue Phase
      timeLeft = (isSession ? sessionLength : breakLength) * 60;
    }
    updateDisplay();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

// Event-Handler
document.getElementById('break-decrement').addEventListener('click', () => {
  if (!isRunning && breakLength > 1) {
    breakLength -= 1;
    if (!isSession) timeLeft = breakLength * 60;
    updateDisplay();
  }
});

document.getElementById('break-increment').addEventListener('click', () => {
  if (!isRunning && breakLength < 60) {
    breakLength += 1;
    if (!isSession) timeLeft = breakLength * 60;
    updateDisplay();
  }
});

document.getElementById('session-decrement').addEventListener('click', () => {
  if (!isRunning && sessionLength > 1) {
    sessionLength -= 1;
    if (isSession) timeLeft = sessionLength * 60;
    updateDisplay();
  }
});

document.getElementById('session-increment').addEventListener('click', () => {
  if (!isRunning && sessionLength < 60) {
    sessionLength += 1;
    if (isSession) timeLeft = sessionLength * 60;
    updateDisplay();
  }
});

document.getElementById('start_stop').addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
  isRunning = !isRunning;
});

document.getElementById('reset').addEventListener('click', () => {
  stopTimer();
  breakLength = 5;
  sessionLength = 25;
  timeLeft = sessionLength * 60;
  isRunning = false;
  isSession = true;

  const beep = document.getElementById('beep');
  beep.pause();
  beep.currentTime = 0;

  updateDisplay();
});

// Initialanzeige aktualisieren
updateDisplay();
