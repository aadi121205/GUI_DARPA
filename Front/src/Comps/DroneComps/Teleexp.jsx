import React from "react";
import telemContext from "../../context/home/TelemContext";
import Teleminfo from "./Teleminfo";
import Map from "./Map";
import { Container, Row, Col } from "react-bootstrap";

const Dts = (delaySec) => {
  if (delaySec === undefined) return 0;
  if (delaySec === null) return 0;
  // Define the min and max values of delay in seconds that correspond to 0 and 5 bars
  const minDelaySec = 0;
  const maxDelaySec = 1; // Assuming 100 seconds is the maximum delay for 5 bars

  // Ensure delaySec is within the expected range
  if (delaySec < minDelaySec) delaySec = minDelaySec;
  if (delaySec > maxDelaySec) delaySec = maxDelaySec;

  // Calculate the bars based on the delaySec
  const bars = ((delaySec - minDelaySec) * 5) / (maxDelaySec - minDelaySec);

  return 5 - bars;
};

function Telemexp() {
  const { telemetryData } = React.useContext(telemContext);
  React.useContext(telemContext);
  const { arm } = React.useContext(telemContext);

  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;

  const scaledValue = Dts(telemetryData.heartbeat);

  const UAVvehicleData = {
    name: "UAV",
    con: telemetryData.heartbeat,
    altitude: telemetryData.altitude,
    mode: telemetryData.mode,
    velocity: telemetryData.groundspeed,
    battery: telemetryData.battery,
    status: telemetryData.status,
    throttle: telemetryData.armed ? telemetryData.throttle : "DISARMED",
    signalStrength: scaledValue,
    state: telemetryData.armed,
    arm: arm,
  };

  return (
    <div className="tab">
      <Row
        style={{
          padding: "20px",
          backgroundColor: "black",
          overflow: "hidden",
        }}
      >
        <Col style={{ padding: "5px", backgroundColor: "black" }}>
          <Container
            bg="dark"
            style={{
              padding: "2px",
              justifyContent: "flex-start",
              alignItems: "left",
              paddingLeft: "0px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Teleminfo vehicle={UAVvehicleData} />
          </Container>
        </Col>
        <Col>
          <Container
            style={{
              padding: "0px",
              overflow: "hidden",
              margin: "0px",
              paddingLeft: "0px",
              backgroundColor: "black",
              borderRadius: "12px",
            }}
          >
            {<Map />}{" "}
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Telemexp;
