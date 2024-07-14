import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import telemContext from "../../context/home/telemContext";
// import Lottie from "react-lottie";
// import animationData from "../../Assets/ugv.json";

const drawerWidth = 900;

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
  const [armed_uav, setArmed_uav] = React.useState(false);
  const [armed_rover, setArmed_rover] = React.useState(false);
  const [uav_1, uav_1_flag] = React.useState(false);
  const [uav_2, uav_2_flag] = React.useState(false);
  const [rover_1, rover_1_flag] = React.useState(false);
  const [rover_2, rover_2_flag] = React.useState(false);
  const [rover_3, rover_3_flag] = React.useState(false);

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

  const arm_uav = () => {
    if (telemetryData.armed) {
      disarmUav();
    } else {
      armUav();
    }
  };

  const arm_rover = () => {
    if (telemetryData_rover.armed) {
      disarmUgv();
    } else {
      armUgv();
    }
  }
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
        <Divider />
      <br></br>
      <Box sx={{ overflow: "hidden" }}>
      <h3 className="text-center mt-21 text-white">OVERALL controls</h3>
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={() => {
                  toggleTelemetry_rover();
                  toggleTelemetry();
                }}                type="button"
                className={`btn w-100 ${
                  telemetryStarted ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted ? "Telemetry \n Stop" : "Telemetry Start"}
              </button>
            </div>
            <div className="col p-2">
                  <button onClick={() => {
                    arm_uav();
                    armUgv();
                }}  type="button" className="btn btn-primary w-100">
                    ARM ALL
                  </button>
                </div>
                <div className="col p-2">
                  <button
                    onClick={STOP_rover}
                    type="button"
                    class="btn btn-danger w-100"
                  >
                    SAFTEY STOP
                  </button>
                </div>
          </div>
        </div>
        <Divider />
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={() => {}} type="button" className={`btn w-100 ${
                  telemetryStarted ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted ? "Missions \n Stop" : "Missions Start"}
              </button>
            </div>
            <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-success w-100">
                    SCRIPTS START
                  </button>
                </div>
                <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-success w-100">
                    SEND Missions
                  </button>
                </div>
          </div>
        </div>
        <Divider />
        <div className="row row-cols-2 p-2">
        <div className="container text-center reduced-padding reduced-margin">
        <h3 className="text-center mt-4 text-white">UAV 1</h3>
        <div className="container text-left text-white reduced-padding reduced-margin">
          <div className="row row-cols-3 p-3 reduced-padding reduced-margin">
            <div className="col p-3 custom-width">
              <h6>ALTITUDE</h6>
              <h5>
                <b>{telemetryData.altitude} m</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width reduced-padding reduced-margin ">
              <h6>MODE</h6>
              <h6>
                <b>{telemetryData.mode}</b>
              </h6>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width reduced-padding reduced-margin">
              <h6>VELOCITY</h6>
              <h5>
                <b>{telemetryData.groundspeed} m/s</b>
              </h5>
            </div>
            <div className="col p-3 custom-width">
              <h6>SIGNAL LOSS</h6>
              <h5>
                <b>{telemetryData.battery} %</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width reduced-padding reduced-margin">
              <h6>STATUS</h6>
              <h5>
                <b>{telemetryData.status}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width reduced-padding reduced-margin">
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
              <p className="text-white text-center reduced-padding reduced-margin">
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
        <h3 className="text-center mt-4 text-white">ROVER 3</h3>
        <div className="container text-left text-white">
          <div className="row row-cols-3 p-3">
            <div className="col p-3 custom-width">
              <h6>DISPLACEMENT</h6>
              <h5>
                <b>{telemetryData_rover.altitude} m</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>MODE</h6>
              <h6>
                <b>{telemetryData_rover.mode}</b>
              </h6>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>VELOCITY</h6>
              <h5>
                <b>{telemetryData_rover.groundspeed} m/s</b>
              </h5>
            </div>
            <div className="col p-3 custom-width">
              <h6>SIGNAL LOSS</h6>
              <h5>
                <b>{telemetryData_rover.battery} %</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>STATUS</h6>
              <h5>
                <b>{telemetryData_rover.status}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
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
                <b>Operation time</b> : {timeofflight} seconds
              </p>
            </div>
            <div className="right">
              {mode === "success" && (
                <>
                  <lottie-player
                    src="https://lottie.host/5b598c58-da7f-405b-9cf7-e0bb78bc38eb/AvDeOYQ5xa.json"
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
        </div>
        <div className="container text-center reduced-padding reduced-margin">
        <Divider />
        <h3 className="text-center mt-4 text-white">ROVER 1</h3>
        <div className="container text-left text-white">
          <div className="row row-cols-3 p-3">
            <div className="col p-3 custom-width">
              <h6>DISPLACEMENT</h6>
              <h5>
                <b>{telemetryData_rover.altitude} m</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>MODE</h6>
              <h6>
                <b>{telemetryData_rover.mode}</b>
              </h6>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>VELOCITY</h6>
              <h5>
                <b>{telemetryData_rover.groundspeed} m/s</b>
              </h5>
            </div>
            <div className="col p-3 custom-width">
              <h6>SIGNAL LOSS</h6>
              <h5>
                <b>{telemetryData_rover.battery} %</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>STATUS</h6>
              <h5>
                <b>{telemetryData_rover.status}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
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
                <b>Operation time</b> : {timeofflight} seconds
              </p>
            </div>
            <div className="right">
              {mode === "success" && (
                <>
                  <lottie-player
                    src="https://lottie.host/5b598c58-da7f-405b-9cf7-e0bb78bc38eb/AvDeOYQ5xa.json"
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
        <h3 className="text-center mt-4 text-white">ROVER 2</h3>
        <div className="container text-left text-white">
          <div className="row row-cols-3 p-3">
            <div className="col p-3 custom-width">
              <h6>DISPLACEMENT</h6>
              <h5>
                <b>{telemetryData_rover.altitude} m</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>MODE</h6>
              <h6>
                <b>{telemetryData_rover.mode}</b>
              </h6>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>VELOCITY</h6>
              <h5>
                <b>{telemetryData_rover.groundspeed} m/s</b>
              </h5>
            </div>
            <div className="col p-3 custom-width">
              <h6>SIGNAL LOSS</h6>
              <h5>
                <b>{telemetryData_rover.battery} %</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
              <h6>STATUS</h6>
              <h5>
                <b>{telemetryData_rover.status}</b>
              </h5>
            </div>
            <div className="col p-3 border border-secondary border-end-0 border-top-0 border-bottom-0 custom-width">
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
                <b>Operation time</b> : {timeofflight} seconds
              </p>
            </div>
            <div className="right">
              {mode === "success" && (
                <>
                  <lottie-player
                    src="https://lottie.host/5b598c58-da7f-405b-9cf7-e0bb78bc38eb/AvDeOYQ5xa.json"
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
        
        <Divider />

        </div>
        </div>
        <Divider />
        <div style={{padding: "10px"}}>
        <h4 className="text-left mt-12 text-white">UAV controls</h4>
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={() => {}} type="button" className={`btn w-100 ${
                  telemetryStarted ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted ? "Mission \n Stop" : "Mission Start"}
              </button>
            </div>
            <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-success w-100">
                    SCRIPT START
                  </button>
                </div>
                <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-danger w-100">
                    STOP UAV
                  </button>
                </div>
          </div>
        </div>
        <Divider />
        <h4 className="text-left mt-12 text-white">UGV1 controls</h4>
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={() => {}} type="button" className={`btn w-100 ${
                  telemetryStarted ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted ? "Mission \n Stop" : "Mission Start"}
              </button>
            </div>
            <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-success w-100">
                    SCRIPT START
                  </button>
                </div>
                <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-danger w-100">
                    STOP UAV
                  </button>
                </div>
          </div>
        </div>
        <Divider />
        <h4 className="text-left mt-12 text-white">UGV2 controls</h4>
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={() => {}} type="button" className={`btn w-100 ${
                  telemetryStarted ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted ? "Mission \n Stop" : "Mission Start"}
              </button>
            </div>
            <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-success w-100">
                    SCRIPT START
                  </button>
                </div>
                <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-danger w-100">
                    STOP UAV
                  </button>
                </div>
          </div>
        </div>
        <Divider />        
        <h4 className="text-left mt-12 text-white">UGV3 controls</h4>
        <div className="container text-center">
          <div className="row row-cols-3 p-2">
            <div className="col p-2">
              <button
                onClick={() => {}} type="button" className={`btn w-100 ${
                  telemetryStarted ? "btn-primary" : "btn-success"
                }`}
              >
                {telemetryStarted ? "Mission \n Stop" : "Mission Start"}
              </button>
            </div>
            <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-success w-100">
                    SCRIPT START
                  </button>
                </div>
                <div className="col p-2">
                  <button onClick={() => {}}  type="button" className="btn btn-danger w-100">
                    STOP UAV
                  </button>
                </div>
          </div>
        </div>
        </div>
        <Divider />

      </Box>
    </Drawer>
  );
}

export default Sidebar;
