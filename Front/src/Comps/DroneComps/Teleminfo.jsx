import * as React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "@mui/material";

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
        <Row>
          <Col>
            <Card style={{ width: '18rem', backgroundColor: 'black', color: 'white' }}>
              <Card.Body>
                <Card.Title>UAV Telemetry</Card.Title>
                <Card.Text>
                  <strong>Status:</strong> {vehicle.status}<br />
                  <strong>alltitude:</strong> {vehicle.altitude} m<br />
                  <strong>Mode:</strong> {vehicle.mode}<br />
                  <strong>Battery:</strong> {vehicle.battery}%<br />
                  <strong>Signal Strength:</strong> {vehicle.signalStrength} dBm<br />
                  <strong>Throttle:</strong> <span style={stylet}>{vehicle.throttle}</span><br />
                  <strong>Arm Status:</strong> {vehicle.armed ? "Armed" : "Disarmed"}<br />
                </Card.Text>
                <Button variant="primary" onClick={vehicle.armed ? vehicle.armed : vehicle.armed}>
                  {vehicle.arm ? "Disarm UAV" : "Arm UAV"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

    </Container>
    </div>
  );
}

export default Teleminfo;