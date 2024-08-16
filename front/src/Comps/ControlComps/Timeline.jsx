// Timeline.js
import React from 'react';
import './Timeline.css';

const Timeline = ({ points }) => {
  return (
    <div className="timeline">
      {points.map((point, index) => (
        <div key={index} className="timeline-point">
          {point}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
