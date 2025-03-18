import React from "react";
import { SocketProvider } from "./Comps/SocketProvider";
import TelemetryDisplay from "./Comps/TelemetryDisplay";

const App: React.FC = () => {
  return (
    <SocketProvider>
      <div>
        <h1>UAV Telemetry Dashboard</h1>
        <TelemetryDisplay />
      </div>
    </SocketProvider>
  );
};

export default App;
