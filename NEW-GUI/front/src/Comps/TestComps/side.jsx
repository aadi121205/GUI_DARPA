import * as React from "react";
import telemContext from "../../context/home/telemContext";
import Teleminfo from "../TelemComps/Teleminfo";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";

function Side() {
  const { telemetryData, telemetryData_rover, mode, stop_Telem, start_Telem, start_Telem_rover, stop_Telem_rover, timeofflight } =
    React.useContext(telemContext);
  const {
    goto_command,
    goto_command_rover,
    auto_command,
    flyUav,
    armUav,
    armUgv,
    disarmUav,
    disarmUgv,
    downloadMission,
    readMission,
    saveMission,
    uploadMission,
    uploadMission_rover,
    landUAV,
    RTL,
    RTL_rover,
    STOP_rover,
    set_Guided,
    flyMission,
  } = React.useContext(telemContext);
  const [telemetryStarted, setTelemetryStarted] = React.useState(false);
  const [telemetryStarted_rover, setTelemetryStarted_rover] = React.useState(false);
  const [telemetryData_rover2, setTelemetryData_rover2] = React.useState({});
  const [armed_uav, setArmed_uav] = React.useState(false);
  const [armed_rover, setArmed_rover] = React.useState(false);
  const [uav_1, uav_1_flag] = React.useState(false);
  const [uav_2, uav_2_flag] = React.useState(false);
  const [rover_1, rover_1_flag] = React.useState(false);
  const [rover_2, rover_2_flag] = React.useState(false);
  const [rover_3, rover_3_flag] = React.useState(false);

  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;
  telemetryData_rover.groundspeed = Math.round(telemetryData_rover.groundspeed * 100) / 100;
  
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

  const arm_uav = () => {
    if (telemetryData.armed) {
      disarmUav();
    } else {
      armUav();
    }
  };

  const arm_rover = () => {
    if (telemetryData_rover.armed) {
      disarmUgv();
    } else {
      armUgv();
    }
  }
  
  const UAVvehicleData = {
    name: "UAV 1",
    con: true, // or false depending on the connection status
    altitude: telemetryData.altitude, // altitude in meters
    mode: telemetryData.mode, // current mode
    velocity: telemetryData.groundspeed, // velocity in m/s
    battery: telemetryData.battery, // battery percentage
    status: telemetryData.status, // status
    throttle: telemetryData.armed ? "ARMED" : "DISARMED", // throttle status
    signalStrength: 5 // signal strength
  };

  return (
    <div className="tab">
      <h1>Telemetry</h1>
      <Button variant="primary" onClick={start_Telem}>Start Telemetry</Button>
      <Button variant="danger" onClick={start_Telem_rover}>start Telemetry</Button>
      <Button variant="danger" onClick={stop_Telem}>Stop Telemetry</Button>

      <h2>UAV</h2>
      <Card>
        <Card.Body>
          <Card.Title>UAV 1</Card.Title>
          <Card.Text>
            <h1>{telemetryData.latitude}</h1>
            <h1>{telemetryData.longitude}</h1>
            <h1>{telemetryData.altitude}</h1>          
            <h2>{telemetryData.groundspeed}</h2>
            <h2>{telemetryData.battery}</h2>
            <h2>{telemetryData.status}</h2>
            <h2>{telemetryData.armed ? "ARMED" : "DISARMED"}</h2>
          </Card.Text>
          <Card.Text>
            <h2>Mode: {telemetryData_rover.mode}</h2>
            <h2>Groundspeed: {telemetryData_rover.groundspeed}</h2>
            <h2>Battery: {telemetryData_rover.battery}</h2>
            <h2>Status: {telemetryData_rover.status}</h2>
            <h2>Throttle: {telemetryData_rover.armed ? "ARMED" : "DISARMED"}</h2>
            <h1>Time of Flight: {timeofflight}</h1>
            <h1>lat: {telemetryData_rover.latitude}</h1>
            <h1>long: {telemetryData_rover.longitude}</h1>
          </Card.Text>

          <Button variant="primary" onClick={arm_uav}>{telemetryData.armed ? "Disarm" : "Arm"}</Button>
          <Button variant="primary" onClick={RTL}>RTL</Button>
          <Button variant="primary" onClick={landUAV}>Land</Button>
          <Button variant="primary" onClick={goto_command}>Goto</Button>
          <Button variant="primary" onClick={auto_command}>Auto</Button>
          <Button variant="primary" onClick={set_Guided}>Guided</Button>
          <Button variant="primary" onClick={downloadMission}>Download Mission</Button>
          <Button variant="primary" onClick={readMission}>Read Mission</Button>
          <Button variant="primary" onClick={saveMission}>Save Mission</Button>
          <Button variant="primary" onClick={uploadMission}>Upload Mission</Button>
          <Button variant="primary" onClick={flyUav}>Fly</Button>
          <Button variant="primary" onClick={flyMission}>Fly Mission</Button>
        </Card.Body>
      </Card>
      </div>
  );
}

export default Side;
