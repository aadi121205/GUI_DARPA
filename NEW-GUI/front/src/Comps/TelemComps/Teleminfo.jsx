import * as React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Teleminfo({ uavName}) {
  return (
    <div>
      <Container style={{display: "flex", justifyContent: "flex-start", alignItems: "left", paddingLeft: "50px", paddingRight: "40px", paddingBottom: "10px", paddingTop: "10px", margin: "5px"}}>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
          <h3>{uavName}</h3>
        </Col>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
          <img src="src/assets/uas_logo.png" alt="Logo" style={{width: "130px", height: "50px"}}/>
        </Col>
        <Col style={{paddingLeft: "40px", justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
          <h6>ALTITUDE</h6>
          <h5><b>{uavName}.altitude m</b></h5>
          <br />
          <h6>MODE</h6>
          <h6><b>{mode}</b></h6>
          <br />
          <h6>VELOCITY</h6>
          <h5><b>{uavName}.velocity m/s</b></h5>
        </Col>
        <Col style={{paddingLeft: "40px", justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
          <h6>SIGNAL LOSS</h6>
          <h5><b>{uavName}.signal_loss %</b></h5>
          <br />
          <h6>STATUS</h6>
          <h5><b>{uavName}.status</b></h5>
          <br />
          <h6>THROTTLE</h6>
          <h5><b style={{ color: throttle === 'ARMED' ? 'green' : 'red' }}>{uavName}.throttle</b></h5>
        </Col>
      </Container>
    </div>
  );
}

export default Teleminfo;
