import { useContext } from "react";
import telemContext from "../../context/home/TelemContext";
import Teleminfo from "./Teleminfo";
import Map from "./Map";
import { Row, Col } from "react-bootstrap";

// Utility to convert delay to signal bars (0-5)
const Dts = (delaySec?: number) => {
  console.log("Delay in seconds:", delaySec);
  if (delaySec === undefined || delaySec === null) return 0;
  const minDelaySec = 0.9;
  const maxDelaySec = 5; // 1 second delay = 0 bars, 0 = 5 bars
  // Clamp
  delaySec = Math.max(minDelaySec, Math.min(maxDelaySec, delaySec));
  // Invert bars (lower delay = higher bars)
  const bars = ((delaySec - minDelaySec) * 5) / (maxDelaySec - minDelaySec);
  return Math.round((5 - bars) * 20); // Round to 2 decimal places
};

type TelemetryData = {
  heartbeat?: number;
  altitude?: number;
  mode?: string;
  groundspeed?: number;
  battery?: number;
  status?: string;
  armed?: boolean;
  [key: string]: any;
};

function Telemexp() {
  const { telemetryData = {}, arm } = useContext(telemContext) as {
    telemetryData: TelemetryData;
    arm: () => void;
  };

  // Protect against undefined
  const groundspeed =
    telemetryData.groundspeed !== undefined
      ? Math.round(telemetryData.groundspeed * 100) / 100
      : 0;

  const scaledValue = Dts(telemetryData.Last_Heartbeat);

  const UAVvehicleData = {
    con: telemetryData.heartbeat ?? 0,
    altitude: telemetryData.altitude ?? 0,
    mode: telemetryData.mode,
    velocity: groundspeed,
    battery: telemetryData.battery ?? 0,
    status: telemetryData.Status,
    throttle: telemetryData.armed ? "ARMED" : "DISARMED",
    signalStrength: scaledValue,
    state: telemetryData.armed ?? false,
    lastHeartbeat: scaledValue,
    arm,
  };

  return (
    <div className="tab">
      <Row
        style={{ padding: 20, backgroundColor: "black", overflow: "hidden" }}
      >
        <Col xs={12} md={4} style={{ padding: 5, backgroundColor: "black" }}>
          <Teleminfo vehicle={UAVvehicleData} />
        </Col>
        <Col xs={12} md={8} style={{ backgroundColor: "black" }}>
          <Map />
        </Col>
      </Row>
    </div>
  );
}

export default Telemexp;
