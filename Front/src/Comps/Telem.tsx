import React from "react";
import { SocketProvider } from "./SocketProvider";
import TelemetryDisplay from "./TelemetryDisplay";
import MapTelemetry from "./map";
import LogsDisplay from "./Logs";
import ReportsDisplay from "./Reports";
import SplitPane from "react-split-pane";

const Telem: React.FC = () => {
  return (
    <SocketProvider>
      <SplitPane
        split="horizontal"
        minSize={200}
        defaultSize="70%"
        style={{ height: "90vh", backgroundColor: "#1a1a1a" }} // Fixed "90 vh"
      >
        <SplitPane split="vertical" minSize={200} defaultSize="20%">
          <div style={{ height: "100%", overflow: "auto" }}>
            <TelemetryDisplay />
          </div>

          <div style={{ height: "100%", overflow: "auto" }}>
            <MapTelemetry />
          </div>
        </SplitPane>

        <SplitPane split="vertical" minSize={100} defaultSize="70%">
          <div style={{ height: "100%", overflow: "wrap" }}>
            <LogsDisplay />
          </div>
          <div style={{ height: "100%", overflow: "auto" }}>
            <ReportsDisplay />
          </div>
        </SplitPane>
      </SplitPane>
    </SocketProvider>
  );
};

export default Telem;
