import { useContext } from "react";
import telemContext from "../../context/home/TelemContext";
import Teleminfo from "./Teleminfo";
import Map from "./Map";
import { Row, Col } from "react-bootstrap";

// Utility to convert delay to signal bars (0-5)
const Dts = (delaySec?: number) => {
  if (delaySec === undefined || delaySec === null) return 0;
  const minDelaySec = 0;
  const maxDelaySec = 1; // 1 second delay = 0 bars, 0 = 5 bars
  // Clamp
  delaySec = Math.max(minDelaySec, Math.min(maxDelaySec, delaySec));
  // Invert bars (lower delay = higher bars)
  const bars = ((delaySec - minDelaySec) * 5) / (maxDelaySec - minDelaySec);
  return Math.round(5 - bars);
};

type TelemetryData = {
  heartbeat?: number;
  altitude?: number;
  mode?: string;
  groundspeed?: number;
  battery?: number;
  status?: string;
  throttle?: number | string;
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

  const scaledValue = Dts(telemetryData.heartbeat);

  const UAVvehicleData = {
    name: "UAV",
    con: telemetryData.heartbeat ?? 0,
    altitude: telemetryData.altitude ?? 0,
    mode: telemetryData.mode ?? "Unknown",
    velocity: groundspeed,
    battery: telemetryData.battery ?? 0,
    status: telemetryData.status ?? "Unknown",
    throttle: telemetryData.armed ? telemetryData.throttle ?? 0 : "DISARMED",
    signalStrength: scaledValue,
    state: telemetryData.armed ?? false,
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
