import * as React from "react";
import Divider from "@mui/material/Divider";
import telemContext from "../../context/home/telemContext";
import Teleminfo from "./Teleminfo";
import Teleminforov from "./Teleminforov";
import Map from "./Map";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

export const haversine_distance = (lat1, lon1, lat2, lon2) => {
  // distance between latitudes
  // and longitudes
  const dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  const dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  // convert to radians
  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  // apply formulae
  const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const rad = 6371;
  const c = 2 * Math.asin(Math.sqrt(a));
  return rad * c * 1000;
};

export const Dts = (delaySec) => {
  const bpm = 1200;  // Define bpm here or pass it as a parameter if it's dynamic
  const beatsPerMinute = bpm;
  const beatsPerBar = 5;  // assuming a 4/4 time signature

  const durationOfOneBeatMs = 60000 / beatsPerMinute;
  const durationOfOneBarMs = durationOfOneBeatMs * beatsPerBar;

  const delayMs = delaySec * 1000;  // convert delay from seconds to milliseconds
  const numberOfBars = delayMs / durationOfOneBarMs;

  // Scale the number of bars to a value between 0 and 5
  let scaledValue = (numberOfBars / 6) * 6;  // Assuming maxBars is 5
  scaledValue = Math.min(scaledValue, 6);  // Cap the value at 5

  return scaledValue;
};

function Telemexp() {
  const { telemetryData, telemetryData_rover } = React.useContext(telemContext);
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
    STOP_rover
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
  }
  const [telemetryStarted, setTelemetryStarted] = React.useState(true);
  const [telemetryStarted_rover, setTelemetryStarted_rover] = React.useState(true);
  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;
  telemetryData_rover.groundspeed = Math.round(telemetryData_rover.groundspeed * 100) / 100;

  const scaledValue = Dts(telemetryData.heartbeat);
  const scaledValue_rover = Dts(telemetryData_rover.heartbeat);

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
    arm: arm_uav,
    rtl: RTL,
    land: landUAV,
    goto: goto_command,
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
    arm: arm_rover,
    rtl: RTL_rover,
    land: STOP_rover,
    goto: goto_command_rover,
    displacment: haversine_distance(telemetryData.latitude, telemetryData.longitude, telemetryData_rover.latitude, telemetryData_rover.longitude),
  };



  return (
    <div className="tab">
        <Row style={{ padding: "24px", backgroundColor: "black"}}>
            <Col style={{ padding: "5px", backgroundColor: "black"}}>
                <Container bg="dark" style={{padding: "2px", justifyContent: "flex-start", alignItems: "left", paddingLeft: "0px", backgroundColor: "black", color: "white"}}>
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminforov vehicle={UGVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
{/*                     <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/> */}
                </Container>
            </Col>
            <Col>
            <Container style={{ padding: "0px", overflow: "hidden",margin: "0px", paddingLeft: "0px", backgroundColor: "black"}}>
                <Map />
            </Container>
            </Col>
        </Row>
    </div>
  );
}

export default Telemexp;
