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
        style={{ height: "90 vh", backgroundColor: "#1a1a1a" }}
      >
        <SplitPane split="vertical" minSize={200} defaultSize="20%">
          <div className="sidebar">
            <TelemetryDisplay />
          </div>

          <div style={{ height: "100%" }}>
            <MapTelemetry />
          </div>
        </SplitPane>

        <SplitPane split="vertical" minSize={200} defaultSize="50%">
          <div style={{ height: "100%" }}>
            <LogsDisplay />
          </div>
          <div style={{ height: "100%" }}>
            <ReportsDisplay />
          </div>
        </SplitPane>
      </SplitPane>
    </SocketProvider>
  );
};

export default Telem;
