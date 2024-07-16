import * as React from "react";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "./Modal";
import SignalBars from "./SignalBar";


const Teleminfo = ({ vehicle }) => {
  const style = vehicle.con ? { color: "green" } : { color: "red" };
  let stylet = { color: "White" };
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
              <h6>MODE</h6>
              <h6>
              <b>{vehicle.mode}</b>
              </h6>
              <br></br>
              <h6>VELOCITY</h6>
              <h5>
                <b>{vehicle.velocity} m/s</b>
              </h5>
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h6>BATT</h6>
              <h5>
                <b>{vehicle.battery} %</b>
              </h5>
              <br></br>
              <h6>STATUS</h6>
              <h5>
                <b>{vehicle.status}</b>
              </h5>
              <br></br>
              <h6>THROTTLE</h6>
              <h5 style={stylet}>
                <b>{vehicle.throttle}</b>
              </h5>
        </Col>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "50px"}}>  
              <SignalBars st={vehicle.signalStrength} />
        </Col>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center"}}>  
        <Modal />
        </Col>
    </Container>
    </div>
  );
}

export default Teleminfo;