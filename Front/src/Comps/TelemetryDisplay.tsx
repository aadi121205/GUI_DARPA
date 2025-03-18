import React from "react";
import { useSocket } from "./SocketProvider";

const TelemetryDisplay: React.FC = () => {
  const { telemetryData } = useSocket();

  return (
    <div>
      <h2>Telemetry Data</h2>
      {telemetryData ? (
        <pre>{JSON.stringify(telemetryData, null, 2)}</pre>
      ) : (
        <p>No telemetry data received yet.</p>
      )}
    </div>
  );
};

export default TelemetryDisplay;
