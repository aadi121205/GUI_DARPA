import React from "react";
import { useSocket } from "./SocketProvider";
import { Col, Container } from "react-bootstrap";

const TelemetryDisplay: React.FC = () => {
  const { telemetryData } = useSocket();

  const colorlist = {
    GUIDED: "Yellow",
    AUTO: "Green",
    RTL: "Red",
    LOITER: "Blue",
    STABILIZE: "Purple",
    BRAKE: "Orange",
    LAND: "Pink",
    POSHOLD: "Cyan",
  };
  const stylet = {
    color: colorlist[telemetryData?.mode as keyof typeof colorlist],
  };
  const batstyle = {
    color: (telemetryData?.battery as number) > 30 ? "Green" : "Red",
  };
  const Statuscololist = {
    UNINIT: "Yellow",
    BOOT: "Yellow",
    CALIBRATING: "Yellow",
    STANDBY: "Yellow",
    ACTIVE: "Green",
    CRITICAL: "Red",
    EMERGENCY: "Red",
    POWEROFF: "Green",
    FLIGHT_TERMINATION: "Red",
  };
  const Statusstyle = {
    color: Statuscololist[telemetryData?.Status as keyof typeof Statuscololist],
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #444",
        borderRadius: "7px",
        margin: "1rem",
        backgroundColor: "#1a1a1a",
        color: "#f0f0f0",
        marginTop: "100px",
        overflow: "wrap"
}}
    >
      <h2 style={{ textAlign: "center", padding: "9px", marginBottom: "30px" }}>
        Telemetry Data
      </h2>
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
            <h4 style={stylet}>
              <b>{telemetryData.mode}</b>
            </h4>
          </Col>
          <Col
            style={{
              paddingLeft: "40px",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: "40px",
            }}
          >
            <h4>STATUS</h4>
            <h4 style={Statusstyle}>
              <b>{telemetryData.Status}</b>
            </h4>
            <br></br>
            <h4>STATE</h4>
            {telemetryData.armed ? (
              <h4 style={{ color: "Red" }}>
                <b>ARMED</b>
              </h4>
            ) : (
              <h4 style={{ color: "Lime" }}>
                <b>DISARMED</b>
              </h4>
            )}
            <br></br>
            <h4>Battery</h4>
            <h4 style={batstyle}>
              <b>{telemetryData.battery}</b>
            </h4>
            <br></br>
          </Col>
        </Container>
      ) : (
        <p style={{ color: "#f0f0f0" }}>No telemetry data received yet.</p>
      )}
    </div>
  );
};

export default TelemetryDisplay;
