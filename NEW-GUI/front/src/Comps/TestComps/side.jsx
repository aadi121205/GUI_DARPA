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

  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;
  telemetryData_rover.groundspeed = Math.round(telemetryData_rover.groundspeed * 100) / 100;

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
      <Card>
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

      </Card>
      </div>
  );
}

export default Side;
