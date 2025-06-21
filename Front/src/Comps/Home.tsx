import telemContext from "../context/home/TelemContext";
import React from "react";

function Home() {
    const { telemetryData } = React.useContext(telemContext);
    return (
        <div>
            <h1>Drone Telemetry</h1>
            <div className="card">
                <p>Drone Telemetry Data:</p>
                <pre>{JSON.stringify(telemetryData, null, 2)}</pre>
            </div>

        </div>
    );
}
export default Home;