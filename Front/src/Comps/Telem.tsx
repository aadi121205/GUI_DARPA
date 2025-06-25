import React from "react";
import telemContext from "../context/home/TelemContext";
import { Button } from "@mui/material";

function Telem() {
    const Data = React.useContext(telemContext);
    React.useContext(telemContext);
    const { 
        arm,
        Takeoff
    } = React.useContext(telemContext);
    return (
        <div>
            <div className="card">
                <p>Drone Telemetry Data:</p>
                <pre>{JSON.stringify(Data, null, 2)}</pre>
            </div>
            <div className="card">
                <p>Toggle Arm Command:</p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={arm}
                >
                    Toggle Arm
                </Button>
            </div>

        </div>
    );
}
export default Telem;