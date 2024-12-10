import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {
  startTimer,
  stopTimer,
  resetTimer,
  incrementSession,
  decrementSession,
  incrementBreak,
  decrementBreak,
  setTimeLeft,
} from './redux/actions';

function App() {
  const {
    breakLength,
    sessionLength,
    timeLeft,
    isRunning,
    isSession,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          dispatch(setTimeLeft(timeLeft - 1));
        } else {
          const beep = document.getElementById('beep');
          beep.play();
          dispatch(setTimeLeft((isSession ? sessionLength : breakLength) * 60));
          dispatch({ type: 'TOGGLE_SESSION' });
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, timeLeft, sessionLength, breakLength, isSession, dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <header>
        <h1>25 + 5 Clock</h1>
      </header>
      <main>
        <section>
          <div id="break-label">Break Length</div>
          <div id="break-length">{breakLength}</div>
          <button onClick={() => dispatch(decrementBreak())}>-</button>
          <button onClick={() => dispatch(incrementBreak())}>+</button>

          <div id="session-label">Session Length</div>
          <div id="session-length">{sessionLength}</div>
          <button onClick={() => dispatch(decrementSession())}>-</button>
          <button onClick={() => dispatch(incrementSession())}>+</button>

          <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>

          <div id="time-left">{formatTime(timeLeft)}</div>
          <button onClick={() => dispatch(isRunning ? stopTimer() : startTimer())}>
            {isRunning ? 'Stop' : 'Start'}
          </button>

          <button onClick={() => dispatch(resetTimer())}>Reset</button>

          <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </section>
      </main>
    </div>
  );
}

export default App;
