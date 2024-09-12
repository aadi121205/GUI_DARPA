import React from "react";
import "./Home.css";
import { Button } from "@mui/material";
import telemContext from "../../context/home/telemContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import { width } from "@mui/system";

const VideoBackground = () => {
  const {
    telemetryData,
    telemetryData_rover,
    mode,
    stop_Telem,
    start_Telem,
    start_Telem_rover,
    stop_Telem_rover,
    timeofflight,
  } = React.useContext(telemContext);
  const [telemetryStarted, setTelemetryStarted] = React.useState(false);
  const [telemetryStarted_rover, setTelemetryStarted_rover] =
    React.useState(false);

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
      <div className="content" style={{ alignItems: "center" }}>
        <h1>Welcome to UAS's GUI</h1>
        <br />
        <h3>
          Here you can find all the information about the UAS's telemetry and
          data <br /> pls switch to full screen
        </h3>
        <br />
        <Row
          style={{
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Col>
            <br />
            <a href="/telem">
              <Button
                onClick={() => {
                  start_Telem();
                  start_Telem_rover();
                }}
                variant="contained"
              >
                Go to Telemetry (UAV)
              </Button>
            </a>
          </Col>
          <Col>
            <br />
            <a href="/telem">
              <Button
                onClick={() => {
                  start_Telem();
                  start_Telem_rover();
                }}
                variant="contained"
              >
                Go to Telemetry (Both)
              </Button>
            </a>
          </Col>
          <Col>
            <br />
            <a href="/telem">
              <Button
                onClick={() => {
                  start_Telem();
                  start_Telem_rover();
                }}
                variant="contained"
              >
                Go to Telemetry (Rover)
              </Button>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VideoBackground;
