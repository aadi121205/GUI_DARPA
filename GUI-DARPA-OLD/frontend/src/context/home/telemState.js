import { useState, useEffect, useContext } from "react";
import telemContext from "./telemContext";
import { SocketContext } from "../socketContext";

const TelemState = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [telemetryData, setTelemetryData] = useState({});
  const [rover_telem_data, set_rover_telem] = useState({});
  const [OdlcData, setOdlcData] = useState({});
  const [roll, setroll] = useState("");
  const [pitch, setpitch] = useState("");
  const [yaw, setyaw] = useState("");
  const [mode, setMode] = useState("danger");
  const [timeofflight, settimeofflight] = useState(0);
  const [pointsdata, setchartData] = useState([]);
  const [button, setButton] = useState(false);
  const [image,setimage] = useState(null)

  const goto_command = () => {
    socket.emit("mission_goto");
  };
  const start_rover_telem = () => {
    socket.emit("start_rover_telem");
  };

  const stop_rover_telem = () => {
    socket.emit("stop_rover_telem");
  };
  const start_Telem = () => {
    socket.emit("startTelem");
  };
  const stop_Telem = () => {
    socket.emit("stopTelem");
  };
  const flyUav = () => {
    socket.emit("takeoffBackend");
  };
  const armUav = () => {
    socket.emit("armingBackend");
  };
  const disarmUav = () => {
    socket.emit("disarmingBackend");
  };
  const setGimbalPoint = () => {
    const data = { roll, pitch, yaw };
    socket.emit("set_gimbal_point", data);
  };
  const downloadMission = () => {
    socket.emit("downloadMission");
  };
  const readMission = () => {
    socket.emit("readMission");
  };
  const uploadMission = () => {
    socket.emit("uploadMission");
  };
  const saveMission = () => {
    socket.emit("saveMission");
  };
  const armRover = () => {
    socket.emit("armRover");
  };
  const stopRover = () => {
    setButton(true);
    socket.emit("stopRover");
  };
  const RTL = () => {
    socket.emit("setRTL");
  };
  const landUAV = () => {
    socket.emit("landUAV");
  };

  const startvideo = () =>{
    socket.emit('startvideo');
    console.log("emit video start")
  }

  const stopvideo = () =>{
    socket.emit('stopvideo');
    console.log("stop emit")
  }

  useEffect(() => {
    socket.on("video_image",(payload)=>{
      setimage(payload)
    })
    socket.on("updateOdlc", (data) => {
      if (Object.keys(data).length > 0) {
        console.log(data);
        setOdlcData((prev_data) => {
          return { ...prev_data, ...data };
        });
      }
    });
    socket.on("telemetryServer", (data) => {
      if (data.altitude > 0.1) {
        settimeofflight(timeofflight + 1);
      }
      setTelemetryData((prevData) => {
        return { ...prevData, ...data };
      });
    });
    socket.on("mode", (flag) => {
      if (flag === true) {
        setMode("success");
      } else {
        setMode("danger");
      }
    });
    socket.on("chart", (chartdata) => {
      if (chartdata.length > 4) {
        chartdata.reverse().pop();
        chartdata.reverse();
      }
      chartdata.push({
        name: chartdata[chartdata.length - 1].name + 1,
        x: Math.random() * 10,
        y: Math.random() * 10,
      });
      setchartData(chartdata);
      // this.render()
    });

    // Rover
    socket.on("telemetryServer_rover", (data) => {
      set_rover_telem((prevData) => {
        return { ...prevData, ...data };
      });
    });

    // socket.on("image", (frame) => {
    //   console.log("data", frame);
    // });
  });

  return (
    <telemContext.Provider
      value={{
        goto_command,
        landUAV,
        RTL,
        button,
        stopRover,
        armRover,
        rover_telem_data,
        telemetryData,
        start_Telem,
        stop_Telem,
        OdlcData,
        flyUav,
        armUav,
        disarmUav,
        setGimbalPoint,
        roll,
        pitch,
        yaw,
        setroll,
        setpitch,
        setyaw,
        downloadMission,
        readMission,
        saveMission,
        uploadMission,
        mode,
        timeofflight,
        pointsdata,
        start_rover_telem,
        stop_rover_telem,
        startvideo,
        stopvideo,
        image
      }}
    >
      {children}
    </telemContext.Provider>
  );
};

export { TelemState };
