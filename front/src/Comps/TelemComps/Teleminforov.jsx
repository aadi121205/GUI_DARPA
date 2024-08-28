import * as React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "./Modalr";
import SignalBars from "./SignalBar";
import { Button } from "@mui/material";
import { fontSize, margin } from "@mui/system";
import Modes from "./Moder";


const Teleminforov = ({ vehicle }) => {
  const stylee = vehicle.con ? { color: "green", fontSize: "40px" } : { color: "red", fontSize: "30px" };
  let stylet = { color: "White", margin: "0px" };
  if (vehicle.throttle === "DISARMED") {
    stylet.color = "red";
  } else {
    stylet.color = "green";
  }
  
  return (
    <div>
    <Container style={{display: "flex", justifyContent: "flex-start", alignItems: "left", paddingLeft: "50px", paddingRight: "40px", paddingBottom: "10px", paddingTop: "10px", margin: "5px"}}>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "30px"}}>
            <h2 style={stylee}>
                {vehicle.name}
            </h2>
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h3>DISPLACEMENT</h3>
              <h3>
                <b>{vehicle.displacment.toFixed(3)} m</b>
              </h3>
              <br></br>
              <h3>VELOCITY</h3>
              <h3>
                <b>{typeof vehicle.velocity === 'number' ? vehicle.velocity.toFixed(2) : 'N/A'} m/s</b>
              </h3>
              <br></br>
              <h3>MODE</h3>
              <Modes vehicle={vehicle} />
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h3>BATTERY</h3>
              <h3>
                <b>{vehicle.battery} %</b>
              </h3>
              <br></br>
              <h3>STATUS</h3>
              <h3>
                <b>{vehicle.status}</b>
              </h3>
              <br></br>
              <h3>THROTTLE</h3>
              <Button variant="primary" onClick={vehicle.arm} style={{ paddingLeft: 0 }}>
              <h3 style={stylet}>
                <b>{vehicle.throttle}</b>
              </h3>
              </Button>
        </Col>
        <Col style={{justifyContent: "center", alignItems: "center", paddingTop: "30px", paddingBottom: "30px"}}>  
              <SignalBars st={vehicle} />
        </Col>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center"}}>  
        <Modal vehicle={vehicle} />
        </Col>
    </Container>
    </div>
  );
}

export default Teleminforov;