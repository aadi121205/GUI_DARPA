import * as React from "react";
import Divider from "@mui/material/Divider";
import telemContext from "../../context/home/telemContext";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import DropdownMenu from "./ConDrop";
import Timelines from "./Timelines";

function Telemexp() {
  const {
    telemetryData,
    telemetryData_rover,
    telemetryData_rover2,
    telemetryData_rover3,
  } = React.useContext(telemContext);
  React.useContext(telemContext);
  const {
    goto_command,
    goto_command_rover,
    auto_command,
    auto_command_rover,
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
    flyMission,
    circle,
  } = React.useContext(telemContext);
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
  };
  const [telemetryStarted, setTelemetryStarted] = React.useState(true);
  const [telemetryStarted_rover, setTelemetryStarted_rover] =
    React.useState(true);
  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;
  telemetryData_rover.groundspeed =
    Math.round(telemetryData_rover.groundspeed * 100) / 100;

  const UAVvehicleData = {
    name: "UAV",
    con: telemetryData.heartbeat,
    altitude: telemetryData.altitude, // altitude in meters
    mode: telemetryData.mode, // current mode
    velocity: telemetryData.groundspeed, // velocity in m/s
    battery: telemetryData.battery, // battery percentage
    status: telemetryData.status ? "Armable" : "Not Armable", // status
    throttle: telemetryData.armed ? "ARMED" : "DISARMED", // throttle status
    arm: arm_uav,
    rtl: RTL,
    land: landUAV,
    goto: goto_command,
    takeoff: flyUav,
    state: telemetryData.state,
    auto: auto_command,
    flymission: flyMission,
    circle: circle,
  };

  const UGVvehicleData = {
    name: "UGV1",
    con: telemetryData_rover.status,
    altitude: telemetryData_rover.altitude, // altitude in meters
    mode: telemetryData_rover.mode, // current mode
    velocity: telemetryData_rover.groundspeed, // velocity in m/s
    battery: telemetryData_rover.battery, // battery percentage
    status: telemetryData_rover.status, // status
    throttle: telemetryData_rover.armed ? "ARMED" : "DISARMED", // throttle status
    arm: arm_rover,
    rtl: RTL_rover,
    land: STOP_rover,
    goto: goto_command_rover,
    flymission: goto_command_rover,
    uploadMission_rover: uploadMission_rover,
    auto: auto_command_rover,
  };
  const UGVvehicleData2 = {
    name: "UGV2",
    con: telemetryData_rover2.status,
    altitude: telemetryData_rover2.altitude, // altitude in meters
    mode: telemetryData_rover2.mode, // current mode
    velocity: telemetryData_rover2.groundspeed, // velocity in m/s
    battery: telemetryData_rover2.battery, // battery percentage
    status: telemetryData_rover2.status, // status
    throttle: telemetryData_rover2.armed ? "ARMED" : "DISARMED", // throttle status
    arm: arm_rover,
    rtl: RTL_rover,
    land: STOP_rover,
    goto: goto_command_rover,
    flymission: goto_command_rover,
    uploadMission_rover: uploadMission_rover,
    auto: auto_command_rover,
  };
  const UGVvehicleData3 = {
    name: "UGV3",
    con: telemetryData_rover3.status,
    altitude: telemetryData_rover3.altitude, // altitude in meters
    mode: telemetryData_rover3.mode, // current mode
    velocity: telemetryData_rover3.groundspeed, // velocity in m/s
    battery: telemetryData_rover3.battery, // battery percentage
    status: telemetryData_rover3.status, // status
    throttle: telemetryData_rover3.armed ? "ARMED" : "DISARMED", // throttle status
    arm: arm_rover,
    rtl: RTL_rover,
    land: STOP_rover,
    goto: goto_command_rover,
    flymission: goto_command_rover,
    uploadMission_rover: uploadMission_rover,
    auto: auto_command_rover,
  };
  const vehicles = [
    UAVvehicleData,
    UGVvehicleData,
    UGVvehicleData2,
    UGVvehicleData3,
  ];

  return (
    <>
    <div style={{ padding: "15px", overflow: "hidden",backgroundColor: "black", color: "white" }}>
      <Row>
        <Col>
          <Timelines />
        </Col>
        <Col>
          <h1>PlaceHolder</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Control Panel</h1>
          <DropdownMenu vehicles={vehicles} />
        </Col>
        <Col>
          <h1>PlaceHolder</h1>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default Telemexp;
