import React from 'react';
import DrumPad from './DrumPad';
import Display from './Display';

const drumPads = [
  { keyTrigger: 'Q', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3', description: 'Heater 1' },
  { keyTrigger: 'W', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3', description: 'Heater 2' },
  { keyTrigger: 'E', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3', description: 'Heater 3' },
  { keyTrigger: 'A', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3', description: 'Heater 4' },
  { keyTrigger: 'S', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3', description: 'Clap' },
  { keyTrigger: 'D', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3', description: 'Open HH' },
  { keyTrigger: 'Z', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3', description: "Kick n' Hat" },
  { keyTrigger: 'X', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3', description: 'Kick' },
  { keyTrigger: 'C', sound: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3', description: 'Closed HH' },
];

const DrumMachine = () => {
  return (
    <div id="drum-machine">
      <Display />
      <div id="pads">
        {drumPads.map((pad) => (
          <DrumPad
            key={pad.keyTrigger}
            keyTrigger={pad.keyTrigger}
            sound={pad.sound}
            description={pad.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
