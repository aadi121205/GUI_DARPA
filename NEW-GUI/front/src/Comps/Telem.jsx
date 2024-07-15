import * as React from "react";
import Teleminfo from "./TelemComps/Teleminfo";
import Map from "./TelemComps/Map";
import Divider from "@mui/material/Divider";
import Modal from "./TelemComps/Modal";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

const UAVvehicleData = {
    name: "UAV 1",
    con: true, // or false depending on the connection status
    altitude: 1200, // altitude in meters
    mode: "Auto", // current mode
    velocity: 15, // velocity in m/s
    battery: 85, // battery percentage
    status: "Active", // status
    throttle: "ARMED", // throttle status
    signalStrength: 4 // signal strength
  };
const UGV1vehicleData = {
    name: "UAV 1",
    con: true, // or false depending on the connection status
    altitude: 1200, // altitude in meters
    mode: "Auto", // current mode
    velocity: 15, // velocity in m/s
    battery: 85, // battery percentage
    status: "Active", // status
    throttle: "ARMED", // throttle status
    signalStrength: 4 // signal strength
  };
const UGV2vehicleData = {
    name: "UAV 1",
    con: true, // or false depending on the connection status
    altitude: 1200, // altitude in meters
    mode: "Auto", // current mode
    velocity: 15, // velocity in m/s
    battery: 85, // battery percentage
    status: "Active", // status
    throttle: "ARMED", // throttle status
    signalStrength: 4 // signal strength
  };
const UGV3vehicleData = {
    name: "UAV 1",
    con: true, // or false depending on the connection status
    altitude: 1200, // altitude in meters
    mode: "Auto", // current mode
    velocity: 15, // velocity in m/s
    battery: 85, // battery percentage
    status: "Active", // status
    throttle: "ARMED", // throttle status
    signalStrength: 4 // signal strength
  };
const UGV4vehicleData = {
    name: "UAV 1",
    con: true, // or false depending on the connection status
    altitude: 1200, // altitude in meters
    mode: "Auto", // current mode
    velocity: 15, // velocity in m/s
    battery: 85, // battery percentage
    status: "Active", // status
    throttle: "ARMED", // throttle status
    signalStrength: 4 // signal strength
  };

function Telem() {
    return (
        <div className="tab">
        <Row style={{ padding: "24px", backgroundColor: "black"}}>
            <Col style={{ padding: "5px", backgroundColor: "black"}}>
                <Container bg="dark" style={{padding: "2px", justifyContent: "flex-start", alignItems: "left", paddingLeft: "0px", backgroundColor: "black", color: "white"}}>
                    <Teleminfo vehicle={UAVvehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UGV1vehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UGV2vehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UGV3vehicleData}/>
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo vehicle={UGV4vehicleData}/>
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

export default Telem;