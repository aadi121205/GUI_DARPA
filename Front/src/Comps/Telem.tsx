import React from "react";
import telemContext from "../context/home/TelemContext";

function Telem() {
    const Data = React.useContext(telemContext);
    return (
        <div>
            <div className="card">
                <p>Drone Telemetry Data:</p>
                <pre>{JSON.stringify(Data, null, 2)}</pre>
            </div>

        </div>
    );
}
export default Telem;