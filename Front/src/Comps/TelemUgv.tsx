import React from "react";
import { SocketProvider } from "./SocketProvider";
import { Container, Row, Col } from "react-bootstrap";
import TelemetryDisplayUgv from "./TelemetryDisplayUgv";


const TelemUgv: React.FC = () => {
  return (
    <SocketProvider>
        
        <Container>
            <Row>
            <Col>
                <h1>yjhgkjjcg</h1>
                <TelemetryDisplayUgv />
            </Col>
            </Row>
        </Container>

    </SocketProvider>
  );
};

export default TelemUgv;
