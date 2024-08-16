// App.js
import React from 'react';
import Timeline from './Timeline';
import './Timelines.css';

const Timelines = () => {
  const points = [
    'Point 1',
    'Point 2',
    'Point 3',
    'Point 4',
    'Point 5',
    'Point 6',
  ];

  return (
    <div className="app-container">
      <h1>Timelines Example</h1>
      <div className="timelines">
        <Timeline points={points} />
        <Timeline points={points} />
        <Timeline points={points} />
        <Timeline points={points} />
      </div>
    </div>
  );
};

export default Timelines;
