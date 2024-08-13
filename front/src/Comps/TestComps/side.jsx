import * as React from "react";
import telemContext from "../../context/home/telemContext";
import Teleminfo from "../TelemComps/Teleminfo";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Map from "./Map";

function Side() {
  const { telemetryData, telemetryData_rover, telemetryData_rover2, telemetryData_rover3 } =
    React.useContext(telemContext);

  return (
    <>
    <Map />
    </>
  );
}

export default Side;
