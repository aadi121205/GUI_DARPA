import * as React from "react";
import telemContext from "../../context/home/telemContext";
import Teleminfo from "../TelemComps/Teleminfo";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Map from "./Map";

function Side() {
  const { telemetryData, telemetryData_rover, telemetryData_rover2, telemetryData_rover3 } =
    React.useContext(telemContext);

  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;
  telemetryData_rover.groundspeed = Math.round(telemetryData_rover.groundspeed * 100) / 100;
  const { latitudes_points, longitudes_points, altitudes_points } = getLatLongAltFrom2DArray(telemetryData?.locations);

  return (
    <>
    <h1>{latitudes_points}</h1>
    <Map />
    </>
  );
}

export default Side;
