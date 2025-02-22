import telemContext from "../Context/Home/telemContext";
import React from "react";

function One() {
    const { telemetryData } = React.useContext(telemContext);
    console.log(telemetryData);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Telemetry Dashboard</h1>
        <h2>mode: {telemetryData.mode}</h2>

      </header>
    </div>

  );
}

export default One;
