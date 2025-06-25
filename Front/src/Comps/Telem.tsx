import React from "react";
import telemContext from "../context/home/TelemContext";
import { Button } from "@mui/material";

// Define the expected context type
type TelemContextType = {
    arm: () => void;
    // Add other properties as needed, e.g.:
    // takeoff?: () => void;
    [key: string]: any; // fallback for other telemetry data
};

function Telem() {
    const Data = React.useContext(telemContext) as TelemContextType;
    const { arm } = Data;
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