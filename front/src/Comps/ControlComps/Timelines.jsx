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
    'Point 7',
    'Point 8',
    'Point 9',
  ];

  return (
    <div className="app-container" style={{ marginTop: 50 }}>
      <div className="timelines">
        <Timeline points={points} />
{/*         <Timeline points={points} />
        <Timeline points={points} />
        <Timeline points={points} /> */}
      </div>
    </div>
  );
};

export default Timelines;
