import React from 'react';
import './Home.css';
import { Button } from "@mui/material";
import telemContext from "../../context/home/telemContext";

const VideoBackground = () => {
    const { telemetryData, telemetryData_rover, mode, stop_Telem, start_Telem, start_Telem_rover, stop_Telem_rover, timeofflight } =
    React.useContext(telemContext);
    const [telemetryStarted, setTelemetryStarted] = React.useState(false);
    const [telemetryStarted_rover, setTelemetryStarted_rover] = React.useState(false);
    const toggleTelemetry = () => {
        if (telemetryStarted) {
          stop_Telem();
        } else {
          start_Telem();
        }
        setTelemetryStarted(!telemetryStarted);
      };
    
      const toggleTelemetry_rover = () => {
        if (telemetryStarted_rover) {
          stop_Telem_rover();
        } else {
          start_Telem_rover();
        }
        setTelemetryStarted_rover(!telemetryStarted_rover);
      };
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
            <Button onClick={() => { start_Telem(); start_Telem_rover(); }} variant="contained">
            Go to Telemetry
            </Button>
            </a>
        </div>
        </div>
    );
};

export default VideoBackground;
