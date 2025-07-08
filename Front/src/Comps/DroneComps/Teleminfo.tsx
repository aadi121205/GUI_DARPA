import { Row, Col, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";

interface Vehicle {
  status: string;
  altitude: number;
  mode: string;
  battery: number;
  signalStrength: number;
  throttle: string;
  arm: () => void;
  velocity: number;
}

interface TeleminfoProps {
  vehicle: Vehicle;
}

const Teleminfo: React.FC<TeleminfoProps> = ({ vehicle }) => {
  const stylet = {
    color:
      vehicle.throttle === "DISARMED"
        ? "red"
        : vehicle.throttle === "ARMED"
        ? "limegreen"
        : "red",
    fontWeight: "bold",
    fontSize: "1.5rem",
    margin: 0,
  };

  const tableCellStyle = {
    fontSize: "1.5rem",
    padding: "1rem",
    color: "white",
    borderColor: "#000",
    borderWidth: "1px",
    borderStyle: "solid",
    verticalAlign: "middle",
  };

  const labelStyle = {
    ...tableCellStyle,
    fontWeight: "bold",
    width: "40%",
    backgroundColor: "#222",
  };

  const valueStyle = {
    ...tableCellStyle,
    width: "60%",
    backgroundColor: "#111",
  };

  return (
    <Row className="justify-content-center">
      <Col md="auto">
        <Card
          style={{
            width: "50rem",
            backgroundColor: "#181818",
            color: "white",
            borderRadius: "2rem",
            boxShadow: "0 9px 44px #0000",
          }}
        >
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "2.2rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              UAV Telemetry
            </Card.Title>
            <Table
              bordered
              style={{ backgroundColor: "transparent", marginBottom: "2rem" }}
            >
              <tbody>
                <tr>
                  <td style={labelStyle}>Status</td>
                  <td style={valueStyle}>{vehicle.status}</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Altitude</td>
                  <td style={valueStyle}>{vehicle.altitude} m</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Mode</td>
                  <td style={valueStyle}>{vehicle.mode}</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Battery</td>
                  <td style={valueStyle}>{vehicle.battery}%</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Ground Speed</td>
                  <td style={valueStyle}>
                    {vehicle.velocity} m/s
                  </td>
                </tr>
                <tr>
                  <td style={labelStyle}>Signal Strength</td>
                  <td style={valueStyle}>{vehicle.signalStrength} dBm</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Throttle</td>
                  <td style={{ ...valueStyle, ...stylet }}>
                    {vehicle.throttle}
                  </td>
                </tr>
                <tr>
                  <td style={labelStyle}>Arm Status</td>
                  <td style={valueStyle}>
                    {vehicle.throttle ? "ARMED" : "Disarmed"}
                  </td>
                </tr>
              </tbody>
            </Table>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color={vehicle.throttle === "ARMED" ? "error" : "success"}
                size="large"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  minWidth: "180px",
                }}
                onClick={vehicle.arm}
              >
                {vehicle.throttle === "ARMED" ? "Disarm UAV" : "Arm UAV"}
              </Button>
            </div>
          </Card.Body>
        </Card>
        <span
          style={{
            color: "white",
            fontSize: "1.2rem",
            textAlign: "center",
            display: "block",
            marginTop: "1rem",
          }}
        >
          <pre>{JSON.stringify(vehicle, null, 2)}</pre>
        </span>
      </Col>
    </Row>
  );
};

export default Teleminfo;
