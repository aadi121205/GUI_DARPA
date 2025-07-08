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
  lastHeartbeat?: string; // Optional field for last heartbeat time
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
  };

  // Define styles for the table cells
  const getModesStyle = () => {
    let color;
    if (vehicle.mode === "AUTO") {
      color = "green";
    } else if (vehicle.mode === "STABILIZE") {
      color = "skyblue";
    } else if (vehicle.mode === "RTL") {
      color = "orange";
    } else {
      color = "gray";
    }
    return {
      color: color,
    };
  };

  const tableCellStyle: React.CSSProperties = {
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
    width: "30%",
    backgroundColor: "#222",
  };

  const valueStyle: React.CSSProperties = {
    ...tableCellStyle,
    width: "70%",
    backgroundColor: "#111",
    fontSize: "2rem",
    color: "white",
    textAlign: "center" as const,
    fontWeight: "normal",
  };

  // Ensure the vehicle object has all required properties
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
            paddingLeft: "2rem",
            paddingRight: "2rem",
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
                  <td style={{ ...valueStyle, ...getModesStyle() }}>
                    {vehicle.mode}
                  </td>
                </tr>
                <tr>
                  <td style={labelStyle}>Battery</td>
                  <td style={valueStyle}>{vehicle.battery} V</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Ground Speed</td>
                  <td style={valueStyle}>{vehicle.velocity} m/s</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Signal Strength</td>
                  <td style={valueStyle}>{vehicle.lastHeartbeat} %</td>
                </tr>
                <tr>
                  <td style={labelStyle}>Throttle</td>
                  <td style={{ ...valueStyle, ...stylet }}>
                    {vehicle.throttle}
                  </td>
                </tr>
              </tbody>
            </Table>

            <Table bordered style={{ marginBottom: "2rem" }}>
              <tbody style={{ textAlign: "center", backgroundColor: "#000" }}>
                <tr>
                  <td style={labelStyle}>
                    <Button
                      variant="contained"
                      color={vehicle.throttle === "ARMED" ? "error" : "success"}
                      size="large"
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        minWidth: "180px",
                      }}
                      onClick={vehicle.arm}
                    >
                      {vehicle.throttle === "ARMED" ? "Disarm UAV" : "Arm UAV"}
                    </Button>
                  </td>
                  <td style={labelStyle}>
                    <Button
                      variant="contained"
                      color={vehicle.throttle === "ARMED" ? "error" : "success"}
                      size="large"
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        minWidth: "180px",
                      }}
                      onClick={vehicle.arm}
                    >
                      {vehicle.throttle === "ARMED" ? "Disarm UAV" : "Arm UAV"}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td style={labelStyle}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        minWidth: "180px",
                      }}
                      onClick={() => {
                        // Placeholder for additional functionality
                        console.log("Additional action triggered");
                      }}
                    >
                      Additional Action
                    </Button>
                  </td>
                  <td style={labelStyle}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                        minWidth: "180px",
                      }}
                      onClick={() => {
                        console.log("Another action triggered");
                      }}
                    >
                      Another Action
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <span
          style={{
            color: "white",
            fontSize: "1.2rem",
            textAlign: "center",
            display: "block",
            marginTop: "3rem",
          }}
        >
          <pre>{JSON.stringify(vehicle, null, 2)}</pre>
        </span>
      </Col>
    </Row>
  );
};

export default Teleminfo;
