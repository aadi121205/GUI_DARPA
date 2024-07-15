import * as React from "react";
import Divider from "@mui/material/Divider";
import telemContext from "../../context/home/telemContext";
import Teleminfo from "../TelemComps/Teleminfo";
import Map from "../TelemComps/Map";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

function Side() {
  const { telemetryData, telemetryData_rover, mode, stop_Telem, start_Telem, start_Telem_rover, stop_Telem_rover, timeofflight } = React.useContext(telemContext);
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
        <Row style={{ padding: "24px", backgroundColor: "black"}}>
            <Col style={{ padding: "5px", backgroundColor: "black"}}>
                <Container bg="dark" style={{padding: "2px", justifyContent: "flex-start", alignItems: "left", paddingLeft: "0px", backgroundColor: "black", color: "white"}}>
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UAVvehicleData}/>
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

export default Side;
