import React from "react";
import { useSocket } from "./SocketProvider";
import { Col, Container } from "react-bootstrap";
import { Button } from "@mui/material";

const TelemetryDisplay: React.FC = () => {
  const { telemetryData } = useSocket();
  let stylet = { color: "White", margin: "0px" };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #444",
        borderRadius: "7px",
        margin: "1rem",
        width: "21vw",
        backgroundColor: "#1a1a1a",
        color: "#f0f0f0",
        height: "68vh",
      }}
    >
      <h2 style={{ textAlign: "center", padding: "9px", marginBottom: "30px" }}>Telemetry Data</h2>
      {telemetryData ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "left",
          }}
        >
          <Col
            style={{
              paddingLeft: "40px",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: "40px",
            }}
          >
            <h4>ALTITUDE</h4>
            <h4 style={{ color: "#0aeafa" }}>
              <b>{telemetryData.altitude} m</b>
            </h4>
            <br></br>
            <h4>VELOCITY</h4>
            <h4>
              <b>{telemetryData.groundspeed.toFixed(4)} m/s</b>
            </h4>
            <br></br>
            <h4>MODE</h4>
            <Button
              /* onClick={telemetryData.arm} */ style={{ paddingLeft: 0 }}
            >
              <h4 style={stylet}>
                <b>{telemetryData.mode}</b>
              </h4>
            </Button>
          </Col>
          <Col
            style={{
              paddingLeft: "40px",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: "40px",
            }}
          >
            <h4>STATE</h4>
            <h4>
              <b>{telemetryData.state}</b>
            </h4>
            <br></br>
            <h4>STATUS</h4>
            <h4>
              <b>{telemetryData.armed ? "ARMED" : "DISARMED"}</b>
            </h4>
            <br></br>
            <h4>Battery</h4>
            <h4>
              <b>{telemetryData.battery}</b>
            </h4>
            <br></br>
            <h4>THROTTLE</h4>
            <Button
              /* onClick={telemetryData.arm} */ style={{ paddingLeft: 0 }}
            >
              <h4 style={stylet}>
                <b>{telemetryData.mode}</b>
              </h4>
            </Button>
          </Col>
{/*             <pre style={{ color: "white" }}>
              {JSON.stringify(telemetryData, null, 2)}
            </pre> */}
        </Container>
      ) : (
        <p style={{ color: "#f0f0f0" }}>No telemetry data received yet.</p>
      )}
    </div>
  );
};

export default TelemetryDisplay;
