import * as React from "react";
import Divider from "@mui/material/Divider";
import telemContext from "../../context/home/telemContext";
import Teleminfo from "./Continfo";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

const Dts = (delaySec) => {
  // Define the min and max values of delay in seconds that correspond to 0 and 5 bars
  const minDelaySec = 0;
  const maxDelaySec = 1; // Assuming 100 seconds is the maximum delay for 5 bars

  // Ensure delaySec is within the expected range
  if (delaySec < minDelaySec) delaySec = minDelaySec;
  if (delaySec > maxDelaySec) delaySec = maxDelaySec;

  // Calculate the bars based on the delaySec
  const bars = (delaySec - minDelaySec) * 5 / (maxDelaySec - minDelaySec);

  return bars;
};

function Contexp() {
  const { telemetryData, telemetryData_rover } = React.useContext(telemContext);
  const [telemetryStarted, setTelemetryStarted] = React.useState(true);
  const [telemetryStarted_rover, setTelemetryStarted_rover] = React.useState(true);
  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;
  telemetryData_rover.groundspeed = Math.round(telemetryData_rover.groundspeed * 100) / 100;

  const scaledValue = Dts(telemetryData.heartbeat);
  const scaledValue_rover = 4

  const UAVvehicleData = {
    name: "UAV 1",
    con: telemetryData.status,
    altitude: telemetryData.altitude, // altitude in meters
    mode: telemetryData.mode, // current mode
    velocity: telemetryData.groundspeed, // velocity in m/s
    battery: telemetryData.battery, // battery percentage
    status: telemetryData.status, // status
    throttle: telemetryData.armed ? "ARMED" : "DISARMED", // throttle status
    signalStrength: scaledValue,
  };

  const UGVvehicleData = {
    name: "UGV 1",
    con: telemetryData_rover.status,
    altitude: telemetryData_rover.altitude, // altitude in meters
    mode: telemetryData_rover.mode, // current mode
    velocity: telemetryData_rover.groundspeed, // velocity in m/s
    battery: telemetryData_rover.battery, // battery percentage
    status: telemetryData_rover.status, // status
    throttle: telemetryData_rover.armed ? "ARMED" : "DISARMED", // throttle status
    signalStrength: scaledValue_rover,
  };



  return (
    <div className="tab">
        <Row style={{ padding: "24px", backgroundColor: "black"}}>
            <Col style={{ padding: "5px", backgroundColor: "black"}}>
                <Container bg="dark" style={{padding: "2px", justifyContent: "flex-start", alignItems: "left", paddingLeft: "0px", backgroundColor: "black", color: "white"}}>
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UGVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
                </Container>
            </Col>
        </Row>
    </div>
  );
}

export default Contexp;
