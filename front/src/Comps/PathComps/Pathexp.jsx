import * as React from "react";
import telemContext from "../../context/home/telemContext";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import CSVDisplay from "./CSVDisplayCon";

function Pathexp() {
  const { data, data_ugv } = React.useContext(telemContext);
  React.useContext(telemContext);
  const { write_map } = React.useContext(telemContext);

  const UGVvehicleData = {
    locations: data_ugv.locations,
    uploadMission: write_map,
  };

  return (
    <>
      <div
        style={{
          padding: "15px",
          overflow: "hidden",
          backgroundColor: "black",
          color: "white",
          alignSelf: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Path Planning</h1>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <CSVDisplay vehicle={UGVvehicleData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Pathexp;
