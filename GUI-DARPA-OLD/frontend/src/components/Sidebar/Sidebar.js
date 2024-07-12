import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
// import List from '@mui/material/List';
import Divider from "@mui/material/Divider";
// import Grid from '@mui/material/Grid';
import telemContext from "../../context/home/telemContext";
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';

const drawerWidth = 430;

function Sidebar() {
  const { telemetryData, telemetryData_rover, mode, stop_Telem, start_Telem, start_Telem_rover, stop_Telem_rover, timeofflight } =
    React.useContext(telemContext);
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
    STOP_rover
  } = React.useContext(telemContext);
  const [telemetryStarted, setTelemetryStarted] = React.useState(false);
  const [telemetryStarted_rover, setTelemetryStarted_rover] = React.useState(false);
  // console.log(telemetryData.armed)
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
        {/*This is the button for checking if the drone is available or not */}
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
                    src="https://lottie.host/272b60dd-462d-42a3-8ed6-fec4143633d6/X4FxBascRI.json"
                    background="##1A2731"
                    speed="1"
                    style={{ width: "70px", height: "70px" }}
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
        <h3 className="text-center mt-21 text-white">UAV control</h3>
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={toggleTelemetry}
                type="button"
                className={`btn w-100 ${
                  telemetryStarted ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted ? "Telemetry UAV \n Stop" : "Telemetry UAV Start"}
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={armUav}
                type="button"
                className="btn btn-success w-100"
              >
                ARM UAV
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={disarmUav}
                type="button"
                className="btn btn-danger w-100"
              >
                DISARM UAV
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={flyUav}
                type="button"
                className="btn btn-primary w-100"
              >
                TAKEOFF
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={RTL}
                type="button"
                className="btn btn-primary w-100"
              >
                UAV RTL
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={landUAV}
                type="button"
                className="btn btn-primary w-100"
              >
                LAND
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={goto_command}
                type="button"
                className="btn btn-primary w-100"
              >
                GOTO
              </button>
            </div>
          </div>
          <div className="row row-cols-3 p-2">
            <div className="d-flex col p-2 ">
              <button
                onClick={downloadMission}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                DOWNLOAD MISSION
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={readMission}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                READ &nbsp; MISSION
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={uploadMission}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                UPLOAD MISSION
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={saveMission}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                SAVE &nbsp; &nbsp; MISSION
              </button>
            </div>
          </div>
        </div>
        <Divider />
        <h3 className="text-center mt-21 text-white">ROVER control</h3>
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={toggleTelemetry_rover}
                type="button"
                className={`btn w-100 ${
                  telemetryStarted_rover ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted_rover ? "Telemetry UGV \n Stop" : "Telemetry UGV Start"}
              </button>
            </div>

            <div className="col p-2">
              <button
                onClick={armUgv}
                type="button"
                className="btn btn-success w-100"
              >
                ARM &nbsp; ROVER
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={disarmUgv}
                type="button"
                className="btn btn-danger w-100"
              >
                DISARM&nbsp; ROVER
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={STOP_rover}
                type="button"
                class="btn btn-secondary"
                >
                STOP ROVER
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={RTL_rover}
                type="button"
                className="btn btn-primary w-100"
              >
                ROVER RTL
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={goto_command_rover}
                type="button"
                className="btn btn-primary w-100"
              >
                GOTO
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={auto_command}
                type="button"
                className="btn btn-primary w-100"
              >
                AUTO
              </button>
            </div>
          </div>
          <div className="row row-cols-3 p-2">
            <div className="d-flex col p-2 ">
              <button
                onClick={downloadMission}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                DOWNLOAD MISSION
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={readMission}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                READ &nbsp; MISSION
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={uploadMission_rover}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                UPLOAD MISSION
              </button>
            </div>
            <div className="col p-2">
              <button
                onClick={saveMission}
                type="button"
                className="btn btn-primary w-100"
                style={{ height: "50px", padding: "2px" }}
              >
                SAVE &nbsp; &nbsp; MISSION
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
