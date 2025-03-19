import React from "react";
import { SocketProvider } from "./SocketProvider";
import TelemetryDisplay from "./TelemetryDisplay";
import { Row, Col } from "react-bootstrap";
import MapTelemetry from "./map";
import { Container } from "react-bootstrap";
import LogsDisplay from "./Logs";

const Telem: React.FC = () => {
  return (
    <div className="body">
      <div className="tab">
        <SocketProvider>
          <Row>
            <Col className="sidebar">
              <TelemetryDisplay />
            </Col>
            <Col style={{ height: "69vh" }}>
              <Container
                style={{
                  height: "64vh",
                }}
              >
                <MapTelemetry />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col style={{ height: "20vh", width: "100%" }}>
              <LogsDisplay />
            </Col>
            <Col style={{ height: "20vh", width: "100%" }}>
            <LogsDisplay />
            </Col>

          </Row>
        </SocketProvider>
      </div>
    </div>
  );
};

export default Telem;
