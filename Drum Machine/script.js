// Get all drum pads and display element
const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

// Map of keys to their display descriptions
const soundDescriptions = {
  'Q': 'Heater 1',
  'W': 'Heater 2',
  'E': 'Heater 3',
  'A': 'Heater 4',
  'S': 'Clap',
  'D': 'Open HH',
  'Z': 'Kick n\' Hat',
  'X': 'Kick',
  'C': 'Closed HH'
};

// Function to play sound and update display
function playSound(pad) {
  const audio = pad.querySelector('audio');
  const key = audio.id;
  
  // Reset audio to start
  audio.currentTime = 0;
  
  // Play the sound
  audio.play();
  
  // Add active class for visual feedback
  pad.classList.add('active');
  
  // Remove active class after animation
  setTimeout(() => pad.classList.remove('active'), 100);
  
  // Update display with sound description
  display.textContent = soundDescriptions[key];
}

// Click event listeners for drum pads
drumPads.forEach(pad => {
  pad.addEventListener('click', () => playSound(pad));
});

// Keyboard event listener
document.addEventListener('keydown', (e) => {
  // Convert key to uppercase to match audio IDs
  const key = e.key.toUpperCase();
  
  // Find pad with matching audio ID
  const pad = Array.from(drumPads).find(pad => 
    pad.querySelector('audio').id === key
  );
  
  // If matching pad found, play the sound
  if (pad) {
    playSound(pad);
  }
});

// Initial display text
display.textContent = 'Drum Machine Ready';