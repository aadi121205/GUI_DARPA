import React, { useState } from 'react';
import './Hud.css';

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);

  const handleChange = (event) => {
    setSpeed(event.target.value);
  };

  const needleStyle = {
    transform: `rotate(${speed * 1.8 - 90}deg)`
  };

  return (
    <div className="speedometer">
      <div className="speed-display">{speed} km/h</div>
      <div className="semicircle">
        <div className="needle" style={needleStyle}></div>
        <input
          type="range"
          min="0"
          max="200"
          value={speed}
          onChange={handleChange}
          className="speed-slider"
        />
      </div>
    </div>
  );
};

export default Speedometer;
