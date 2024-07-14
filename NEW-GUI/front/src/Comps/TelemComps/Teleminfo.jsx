import * as React from "react";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Teleminfo() {
  return (
    <div>
    <Container style={{display: "flex", justifyContent: "flex-start", alignItems: "left", paddingLeft: "50px", paddingRight: "40px", paddingBottom: "10px", paddingTop: "10px", margin: "5px"}}>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
            <h3>
                UAV1
            </h3>
        </Col>
        <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>            
        <img src = "src/assets/uas_logo.png" alt="Logo" style={{width: "130px", height: "50px"}}/>
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px", paddingLeft: "40px"}}>
              <h6>ALTITUDE</h6>
              <h5>
                <b>m</b>
              </h5>
              <br></br>
              <h6>MODE</h6>
              <h6>
              <b>m</b>
              </h6>
              <br></br>
              <h6>VELOCITY</h6>
              <h5>
                <b> m/s</b>
              </h5>
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h6>SIGNAL LOSS</h6>
              <h5>
                <b>%</b>
              </h5>
              <br></br>
              <h6>STATUS</h6>
              <h5>
                <b>x</b>
              </h5>
              <br></br>
              <h6>THROTTLE</h6>
              <h5>
                  <b style={{ color: "green" }}>ARMED</b>
              </h5>
        </Col>
        <Col style={{paddingLeft: "40px",justifyContent: "center", alignItems: "center", paddingRight: "40px"}}>
              <h6>SIGNAL LOSS</h6>
              <h5>
                <b>%</b>
              </h5>
              <br></br>
              <h6>STATUS</h6>
              <h5>
                <b>x</b>
              </h5>
              <br></br>
              <h6>THROTTLE</h6>
              <h5>
                  <b style={{ color: "green" }}>ARMED</b>
              </h5>
        </Col>
    </Container>
    </div>
  );
}

export default Teleminfo;