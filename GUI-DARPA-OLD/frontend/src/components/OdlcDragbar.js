import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { MdOpenInBrowser } from "react-icons/md";
import { TbArrowAutofitDown } from "react-icons/tb";
import telemContext from "../context/home/telemContext";
import Divider from "@mui/material/Divider";



export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [index,setIndex] = React.useState(0)
  const [logo,setlogo] = React.useState(false)

  const toggleDrawer = () => {
    setIndex(index+1)
    console.log(index)
    if(index%2===0){
        setState({ ...state, bottom: !state.bottom });
        setlogo(true)
    }
    else{
        setState({ ...state, bottom: !state.bottom });
        setlogo(false)
    }
  };
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


  const drawerContent2 = (
    <Box
      sx={{
        width: '100vw', // Set width to 100% of viewport width
        height: '35vh', // Set height to 92.7% of viewport height
        backgroundColor: '#0D101B', // Set background color to black
        color: 'white', // Set text color to white
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '100px',
        padding: '20px',
        margin: '0px',
      }}
    >
      <h3 className='text-center mt-21 text-white'>only for use in emergency simulation</h3>
      <br />
      <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h3 className="text-center mt-21 text-white">UAV-1 control</h3>
          <div className="container text-center">
            <div className="row row-cols-3 p-2">
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
          </div>
        </div>
        <Divider orientation="vertical" flexItem style={{ background: 'white', height: '100%', width: '5px' }} />
        <div style={{ flex: 1 }}>
          <h3 className="text-center mt-21 text-white">ROVER-3 control</h3>
          <div className="container text-center">
            <div className="row row-cols-3 p-2">

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
                  class="btn btn-secondary w-100"
                >
                  STOP ROVER
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
          </div>
        </div>
      </div>
      <Divider />
      <br />
      <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h3 className="text-center mt-21 text-white">ROVER-1 control</h3>
          <div className="container text-center">
            <div className="row row-cols-3 p-2">

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
                  class="btn btn-secondary w-100"
                >
                  STOP ROVER
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
          </div>
          <Divider />
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="text-center mt-21 text-white">ROVER-2 control</h3>
          <div className="container text-center">
            
            <div className="row row-cols-3 p-2">
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
                  class="btn btn-secondary w-100"
                >
                  STOP ROVER
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
          </div>
          <Divider/>
        </div>
      </div>
    </Box>
  );
  const drawerContent = (
    <Box
      sx={{
        width: '100vw', // Set width to 100% of viewport width
        height: '100px', // Adjust height as needed
        backgroundColor: '#0D101B', // Set background color to black
        color: 'white', // Set text color to white
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Controls Display</h2>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer}>
        {!logo ? (
            <MdOpenInBrowser style={{ fontSize: 30, color: "white" }} />
        ):(
            <TbArrowAutofitDown style={{ fontSize: 30, color: "white" }} />
        )}
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
                {drawerContent}

        {drawerContent2}
      </SwipeableDrawer>
    </div>
  );
}
