import React from 'react';
import './HomeComps/Home.css';
import Button from '@mui/material/Button';

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={`/src/assets/swarm.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Welcome to UAS's GUI</h1>
        <h3>Here you can find all the information about the UAS's telemetry and data</h3>
        <br />
        <a href="/telem">
        <Button variant="contained">
            Go to Telemetry
        </Button>
        </a>
      </div>
    </div>
  );
};

export default VideoBackground;
