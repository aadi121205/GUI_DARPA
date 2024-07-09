import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
// import List from '@mui/material/List';
import Divider from "@mui/material/Divider";
// import Grid from '@mui/material/Grid';
import telemContext from "../context/home/telemContext";
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import "./Sidebar.css";

const drawerWidth = 480;

function Sidebar() {
  const [color_arm,setColor_arm] =React.useState("white")
  const color_change = ()=>{
    setColor_arm("red")
  }
  const {
    rover_telem_data,
    start_rover_telem,
    stop_rover_telem,
    armRover,
    stopRover,
    mode,
  } = React.useContext(telemContext);
  const [telemetryStarted, setTelemetryStarted] = React.useState(false);
  const toggleTelemetry = () => {
    if (telemetryStarted) {
      stop_rover_telem();
    } else {
      start_rover_telem();
    }
    setTelemetryStarted(!telemetryStarted);
  };
  const blinkButton = () => {
        const button = document.getElementById('stopButton');
        button.classList.toggle('blinking');
    };

    // Call blinkButton every second
    React.useEffect(() => {
        const interval = setInterval(blinkButton, 1000);
        return () => clearInterval(interval);
    }, []);
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          backgroundColor: "#1A2731",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "hidden" }}>
        <h2 className="text-center mt-2 text-white">Command and control</h2>
        {/*This is the button for checking if the drone is available or not */}
        <div className="container text-left text-white">
          <div className="row row-cols-2 p-3" style={{ width: "97%" }}>
            <div className="col p-3 ">
              <h6 style={{ fontWeight: "bolder", fontFamily: "Ubuntu" }}>
                LATITUDE
              </h6>
              <h5>
                <b>{rover_telem_data.latitude} m</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6 style={{ fontWeight: "bolder", fontFamily: "Ubuntu" }}>
                MODE
              </h6>
              <h5>
                <b>{rover_telem_data.mode}</b>
              </h5>
            </div>
            <div className="col p-3 ">
              <h6 style={{ fontWeight: "bolder", fontFamily: "Ubuntu" }}>
                LONGITUDE
              </h6>
              <h5>
                <b>{rover_telem_data.longitude}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6 style={{ fontWeight: "bolder", fontFamily: "Ubuntu" }}>
                GROUNDSPEED
              </h6>
              <h5>
                <b>{Math.ceil(rover_telem_data.groundspeed)} </b>
              </h5>
            </div>
            <div className="col p-3 ">
              <h6 style={{ fontWeight: "bolder", fontFamily: "Ubuntu" }}>
                STATUS
              </h6>
              <h5>
                <b>{rover_telem_data.status}</b>
              </h5>
            </div>
            <div className="col p-3  d-flex align-items-center justify-content-start border border-secondary border-end-0 border-top-0 border-bottom-0" style={{color:`${color_arm}`}}>
              <h5>
                <b>ARMED{rover_telem_data.armed}</b>
              </h5>
            </div>
          </div>
        </div>
        <Divider />
        <h2 className="text-center mt-2 text-white">Vehicle control</h2>
        <div className="d-flex justify-content-center align-items-center " style={{width:"100%"}}>
          {mode === "success" && (
            <lottie-player
              src="https://lottie.host/4e185203-34b8-4ee9-8353-b4a7e549537d/WXfunQTroA.json"
              background="##1A2731"
              speed="1"
              style={{ width: "150px", height: "150px" }}
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          )}
        </div>
        <div className="row justify-content-center p-3">
          <div className="col-auto p-2">
            <button
              onClick={toggleTelemetry}
              type="button"
              style={{ width: "200px" }}
              className={`btn ${
                telemetryStarted ? "btn-danger" : "btn-success"
              }`}
            >
              {telemetryStarted ? "STOP" : "TELEMETRY"}
            </button>
          </div>
          <div className="col-auto p-2">
            <button
              onClick={()=>{
                color_change()
                armRover()
              }}
              type="button"
              style={{ width: "200px" }}
              className="btn btn-success"
            >
              ARM
            </button>
          </div>
        </div>
        <div className="row justify-content-center p-3">
          <div className="col-auto p-2">
            <button
              id="stopButton"
              onClick={()=>{
                stopRover()
              }}
              type="button"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "250px",
                border: "4px solid red",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                transform: "translateY(4px)",
              }}
              className="btn btn-danger btn-rounded"
            >
              Force stop
            </button>
          </div>
        </div>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
