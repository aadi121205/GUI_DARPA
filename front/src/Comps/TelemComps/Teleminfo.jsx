import * as React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "./Modal";
import SignalBars from "./SignalBar";
import { Button } from "@mui/material";
import { margin } from "@mui/system";
import Mode from "./Mode";

const Teleminfo = ({ vehicle }) => {
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
          <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h2 style={stylee}>
                  {vehicle.name}
              </h2>
          </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h4>ALTITUDE</h4>
              <h4 style={{ color: "#0aeafa" }}>
                <b>{vehicle.altitude} m</b>
              </h4>
              <br></br>
              <h4>VELOCITY</h4>
              <h4>
                <b>{vehicle.velocity} m/s</b>
              </h4>
              <br></br>
              <h4>MODE</h4>
              <Mode vehicle={vehicle} />
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h4>STATE</h4>
              <h4>
                <b>{vehicle.state}</b>
              </h4>
              <br></br>
              <h4>STATUS</h4>
              <h4>
                <b>{vehicle.status}</b>
              </h4>
              <br></br>
              <h4>THROTTLE</h4>
              <Button variant="primary" onClick={vehicle.arm} style={{ paddingLeft: 0 }}>
              <h4 style={stylet}>
                <b>{vehicle.throttle}</b>
              </h4>
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

export default Teleminfo;