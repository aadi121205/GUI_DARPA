import * as React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "./Modal";
import SignalBars from "./SignalBar";
import { Button } from "@mui/material";
import { margin } from "@mui/system";
import Mode from "./Mode";

const Teleminfo = ({ vehicle }) => {
  const style = vehicle.con ? { color: "green" } : { color: "red" };
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
              <h3 style={style}>
                  {vehicle.name}
              </h3>
          </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h6>ALTITUDE</h6>
              <h5>
                <b>{vehicle.altitude} m</b>
              </h5>
              <br></br>
              <h6>VELOCITY</h6>
              <h5>
                <b>{vehicle.velocity} m/s</b>
              </h5>
              <br></br>
              <h6>MODE</h6>
              <Mode vehicle={vehicle} />
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h6>STATE</h6>
              <h5>
                <b>{vehicle.state}</b>
              </h5>
              <br></br>
              <h6>STATUS</h6>
              <h5>
                <b>{vehicle.status}</b>
              </h5>
              <br></br>
              <h6>THROTTLE</h6>
              <Button variant="primary" onClick={vehicle.arm} style={{ paddingLeft: 0 }}>
              <h5 style={stylet}>
                <b>{vehicle.throttle}</b>
              </h5>
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