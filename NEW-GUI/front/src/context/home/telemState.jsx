import { useState, useEffect, useContext } from "react";
import telemContext from "./telemContext";
import { SocketContext } from "../socketContext";

const TelemState = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [telemetryData, setTelemetryData] = useState({});
  const [telemetryData_rover, setTelemetryData_rover] = useState({});
  const [telemetryData_rover2, setTelemetryData_rover2] = useState({});
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
  const goto_command_rover = () => {
    socket.emit("mission_goto_rover");
  };
  const auto_command = () => {
    socket.emit("mission_auto_rover");
  };
  const stop_Telem_rover = () => {
    socket.emit("stop_Telem_rover");
  };
  const start_Telem_rover = () => {
    socket.emit("start_Telem_rover");
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
  const disarmUgv = () => {
    socket.emit("disarmingBackend_rover");
  };
  const flyMission = () => {
    socket.emit("flyMission");
  };
  const setGimbalPoint = () => {
    const data = { roll, pitch, yaw };
    socket.emit("set_gimbal_point", data);
  };
  const setGimbalPoint_rover = () => {
    const data = { roll, pitch, yaw };
    socket.emit("set_gimbal_point_rover", data);
  };
  const downloadMission = () => {
    socket.emit("downloadMission");
  };
  const downloadMission_rover = () => {
    socket.emit("downloadMission_rover");
  };
  const readMission_rover = () => {
    socket.emit("readMission_rover");
  };
  const readMission = () => {
    socket.emit("readMission");
  };
  const uploadMission = () => {
    socket.emit("uploadMission");
  };
  const uploadMission_rover = () => {
    socket.emit("uploadMission_rover");
  };
  const saveMission = () => {
    socket.emit("saveMission");
  };
  const saveMission_rover = () => {
    socket.emit("saveMission_rover");
  };
  const armUgv = () => {
    socket.emit("armingBackend_rover");
  };
  const stopRover = () => {
    setButton(true);
    socket.emit("stopRover");
  };
  const RTL = () => {
    socket.emit("setRTL");
  };
  const RTL_rover = () => {
    socket.emit("setRTL_rover");
  };
  const STOP_rover = () => {
    socket.emit("setSTOP_rover");
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
  const startvideo_rover = () =>{
    socket.emit('startvideo_rover');
    console.log("emit video start_rover")
  }
  const set_Guided = () => {
    socket.emit("set_Guided");
  };

  const stopvideo_rover = () =>{
    socket.emit('stopvideo_rover');
    console.log("stop emit_rover")
  }

  useEffect(() => {
    socket.on("video_image",(payload)=>{
      setimage(payload)
    })
    socket.on("video_image_rover",(payload)=>{
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
    socket.on("telemetryServer_rover", (data) => {
      settimeofflight(timeofflight + 1);
      setTelemetryData_rover((prevData) => {
        return { ...prevData, ...data };
      });
    });
    socket.on("telemetryServer_rover2", (data) => {
      settimeofflight(timeofflight + 1);
      setTelemetryData_rover2((prevData) => {
        return { ...prevData, ...data };
      });
    }
    );
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

    // socket.on("image", (frame) => {
    //   console.log("data", frame);
    // });
  });

  return (
    <telemContext.Provider
      value={{
        goto_command,
        auto_command,
        landUAV,
        RTL,
        RTL_rover,
        STOP_rover,
        button,
        goto_command_rover,
        setGimbalPoint_rover,
        downloadMission_rover,
        readMission_rover,
        uploadMission_rover,
        saveMission_rover,
        stopRover,
        armUgv,
        disarmUgv,
        telemetryData_rover,
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
        start_Telem_rover,
        stop_Telem_rover,
        startvideo,
        stopvideo,
        startvideo_rover,
        stopvideo_rover,
        image,
        set_Guided,
        flyMission,
      }}
    >
      {children}
    </telemContext.Provider>
  );
};

export { TelemState };
