import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import telemContext from "../../context/home/telemContext";

const drawerWidth = 430;

function Sidebar() {
  const {
    telemetryData,
    telemetryData_rover,
    mode,
    stop_Telem,
    start_Telem,
    start_Telem_rover,
    stop_Telem_rover,
    timeofflight,
  } = React.useContext(telemContext);
  const {
    goto_command,
    goto_command_rover,
    auto_command,
    flyUav,
    armUav,
    armUgv,
    disarmUav,
    disarmUgv,
    downloadMission,
    readMission,
    saveMission,
    uploadMission,
    uploadMission_rover,
    landUAV,
    RTL,
    RTL_rover,
    STOP_rover,
  } = React.useContext(telemContext);
  const [telemetryStarted, setTelemetryStarted] = React.useState(false);
  const [telemetryStarted_rover, setTelemetryStarted_rover] = React.useState(false);

  telemetryData.groundspeed = Math.round(telemetryData.groundspeed * 100) / 100;
  telemetryData_rover.groundspeed = Math.round(telemetryData_rover.groundspeed * 100) / 100;

  const toggleTelemetry = () => {
    if (telemetryStarted) {
      stop_Telem();
    } else {
      start_Telem();
    }
    setTelemetryStarted(!telemetryStarted);
  };

  const toggleTelemetry_rover = () => {
    if (telemetryStarted_rover) {
      stop_Telem_rover();
    } else {
      start_Telem_rover();
    }
    setTelemetryStarted_rover(!telemetryStarted_rover);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0D101B",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <h2 className="text-center mt-4 text-white">UAV</h2>
        <div className="container text-left text-white">
          <div className="row row-cols-3 p-3">
            <div className="col p-3 ">
              <h6>ALTITUDE</h6>
              <h5>
                <b>{telemetryData.altitude} m</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>MODE</h6>
              <h5>
                <b>{telemetryData.mode}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>VELOCITY</h6>
              <h5>
                <b>{telemetryData.groundspeed} m/s</b>
              </h5>
            </div>
            <div className="col p-3 ">
              <h6>BATTERY</h6>
              <h5>
                <b>{telemetryData.battery} %</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>STATUS</h6>
              <h5>
                <b>{telemetryData.status}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>THROTTLE</h6>
              <h5>
                {telemetryData.armed ? (
                  <b style={{ color: "green" }}>ARMED</b>
                ) : (
                  <b style={{ color: "red" }}>DISARMED</b>
                )}
              </h5>
            </div>
          </div>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ minWidth: "200px" }}
          >
            <div className="left">
              <p className="text-white text-center">
                <b>Flight time</b> : {timeofflight} seconds
              </p>
            </div>
            <div className="right">
              {mode === "success" && (
                <>
                  <lottie-player
                    src="https://lottie.host/4e185203-34b8-4ee9-8353-b4a7e549537d/WXfunQTroA.json"
                    background="##1A2731"
                    speed="1"
                    style={{ width: "50px", height: "50px" }}
                    loop
                    autoplay
                    direction="1"
                    mode="normal"
                  ></lottie-player>
                </>
              )}
            </div>
          </div>
        </div>
        <Divider />
        <h2 className="text-center mt-4 text-white">ROVER</h2>
        <div className="container text-left text-white">
          <div className="row row-cols-3 p-3">
            <div className="col p-3 ">
              <h6>ALTITUDE</h6>
              <h5>
                <b>{telemetryData_rover.altitude} m</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>MODE</h6>
              <h5>
                <b>{telemetryData_rover.mode}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>VELOCITY</h6>
              <h5>
                <b>{telemetryData_rover.groundspeed} m/s</b>
              </h5>
            </div>
            <div className="col p-3 ">
              <h6>BATTERY</h6>
              <h5>
                <b>{telemetryData_rover.battery} %</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>STATUS</h6>
              <h5>
                <b>{telemetryData_rover.status}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0">
              <h6>THROTTLE</h6>
              <h5>
                {telemetryData_rover.armed ? (
                  <b style={{ color: "green" }}>ARMED</b>
                ) : (
                  <b style={{ color: "red" }}>DISARMED</b>
                )}
              </h5>
            </div>
          </div>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ minWidth: "200px" }}
          >
            <div className="left">
              <p className="text-white text-center">
                <b>Flight time</b> : {timeofflight} seconds
              </p>
            </div>
            <div className="right">
              {mode === "success" && (
                <>
                  <lottie-player
                    src="https://lottie.host/4e185203-34b8-4ee9-8353-b4a7e549537d/WXfunQTroA.json"
                    background="##1A2731"
                    speed="1"
                    style={{ width: "50px", height: "50px" }}
                    loop
                    autoplay
                    direction="1"
                    mode="normal"
                  ></lottie-player>
                </>
              )}
            </div>
          </div>
        </div>
        </Box>
        </Drawer>
    );
}