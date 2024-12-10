import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDisplay } from '../store';

const DrumPad = ({ keyTrigger, sound, description }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false); // Track active state

  const playSound = () => {
    const audio = document.getElementById(keyTrigger);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      dispatch(setDisplay(description));
      setIsActive(true); // Set active when sound plays
      setTimeout(() => setIsActive(false), 150); // Remove active state after 150ms
    }
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === keyTrigger) {
      playSound();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div
      className={`drum-pad ${isActive ? 'active' : ''}`}
      id={description}
      onClick={playSound}
    >
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={sound}></audio>
    </div>
  );
};

export default DrumPad;
