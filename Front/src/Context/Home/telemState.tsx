import { useState, useEffect, useContext } from "react";
import telemContext from "./telemContext";
import { SocketContext } from "../SocketContext";

const TelemState = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [telemetryData, setTelemetryData] = useState({});
  const [telemetryData_rover, setTelemetryData_rover] = useState({});
  const [telemetryData_rover2, setTelemetryData_rover2] = useState({});
  const [telemetryData_rover3, setTelemetryData_rover3] = useState({});
  const [data, setData] = useState({});
  const [data_ugv, setData_ugv] = useState({});
  const [OdlcData, setOdlcData] = useState({});
  const [roll, setroll] = useState("");
  const [pitch, setpitch] = useState("");
  const [yaw, setyaw] = useState("");
  const [mode, setMode] = useState("danger");
  const [timeofflight, settimeofflight] = useState(0);
  const [pointsdata, setchartData] = useState([]);
  const [button, setButton] = useState(false);
  const [image, setImage] = useState(null);

  const goto_command = () => {
    socket.emit("mission_goto");
  };
  const goto_command_rover = () => {
    socket.emit("mission_goto_rover");
  };
  const goto_command_rover2 = () => {
    socket.emit("mission_goto_rover2");
  };
  const goto_command_rover3 = () => {
    socket.emit("mission_goto_rover3");
  };
  const auto_command = () => {
    socket.emit("mission_auto");
  };
  const auto_command_rover = () => {
    socket.emit("auto_rover");
  };
  const auto_command_rover2 = () => {
    socket.emit("auto_rover2");
  };
  const auto_command_rover3 = () => {
    socket.emit("auto_rover3");
  };

  const stop_Telem_rover = () => {
    socket.emit("stop_Telem_rover");
  };
  const stop_Telem_rover2 = () => {
    socket.emit("stop_Telem_rover2");
  };
  const stop_Telem_rover3 = () => {
    socket.emit("stop_Telem_rover3");
  };
  const start_Telem_rover = () => {
    socket.emit("start_Telem_rover");
  };
  const start_Telem_rover2 = () => {
    socket.emit("start_Telem_rover2");
  };
  const start_Telem_rover3 = () => {
    socket.emit("start_Telem_rover3");
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
  const disarmUgv2 = () => {
    socket.emit("disarmingBackend_rover2");
  };
  const disarmUgv3 = () => {
    socket.emit("disarmingBackend_rover3");
  };
  const flyMission = () => {
    socket.emit("flyMission");
  };
  const write_mission = (data) => {
    socket.emit("write_mission", data);
    console.log(data)
  };
  const write_mission_rover = (data) => {
    socket.emit("write_mission_rover", data);
  };
  const write_mission_rover2 = (data) => {
    socket.emit("write_mission_rover2", data);
  };
  const write_mission_rover3 = (data) => {
    socket.emit("write_mission_rover3", data);
  };
  const write_map = (data) => {
    socket.emit("write_map", data);
  };
  const downloadMission = () => {
    socket.emit("downloadMission");
  };
  const downloadMission_rover = () => {
    socket.emit("downloadMission_rover");
  };
  const downloadMission_rover2 = () => {
    socket.emit("downloadMission_rover2");
  };
  const downloadMission_rover3 = () => {
    socket.emit("downloadMission_rover3");
  };
  const readMission_rover = () => {
    socket.emit("readMission_rover");
  };
  const readMission_rover2 = () => {
    socket.emit("readMission_rover2");
  };
  const readMission_rover3 = () => {
    socket.emit("readMission_rover3");
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
  const uploadMission_rover2 = () => {
    socket.emit("uploadMission_rover2");
  };
  const uploadMission_rover3 = () => {
    socket.emit("uploadMission_rover3");
  };
  const saveMission = () => {
    socket.emit("saveMission");
  };
  const saveMission_rover = () => {
    socket.emit("saveMission_rover");
  };
  const saveMission_rover2 = () => {
    socket.emit("saveMission_rover2");
  };
  const saveMission_rover3 = () => {
    socket.emit("saveMission_rover3");
  };
  const armUgv = () => {
    socket.emit("armingBackend_rover");
  };
  const armUgv2 = () => {
    socket.emit("armingBackend_rover2");
  };
  const armUgv3 = () => {
    socket.emit("armingBackend_rover3");
  };
  const stopRover = () => {
    setButton(true);
    socket.emit("stopRover");
  };
  const stopRover2 = () => {
    setButton(true);
    socket.emit("stopRover2");
  };
  const stopRover3 = () => {
    setButton(true);
    socket.emit("stopRover3");
  };
  const RTL = () => {
    socket.emit("setRTL");
  };
  const RTL_rover = () => {
    socket.emit("setRTL_rover");
  };
  const RTL_rover2 = () => {
    socket.emit("setRTL_rover2");
  };
  const RTL_rover3 = () => {
    socket.emit("setRTL_rover3");
  };
  const STOP_rover = () => {
    socket.emit("setSTOP_rover");
  };
  const STOP_rover2 = () => {
    socket.emit("setSTOP_rover2");
  };
  const STOP_rover3 = () => {
    socket.emit("setSTOP_rover3");
  };
  const landUAV = () => {
    socket.emit("landUAV");
  };

  const startvideo = () => {
    socket.emit("startvideo");
    console.log("emit video start");
  };

  const stopvideo = () => {
    socket.emit("stopvideo");
    console.log("stop emit");
  };
  const startvideo_rover = () => {
    socket.emit("startvideo_rover");
    console.log("emit video start_rover");
  };
  const startvideo_rover2 = () => {
    socket.emit("startvideo_rover2");
    console.log("emit video start_rover2");
  };
  const startvideo_rover3 = () => {
    socket.emit("startvideo_rover3");
    console.log("emit video start_rover3");
  };
  const set_Guided = () => {
    socket.emit("set_Guided");
  };

  const stopvideo_rover = () => {
    socket.emit("stopvideo_rover");
    console.log("stop emit_rover");
  };
  const stopvideo_rover2 = () => {
    socket.emit("stopvideo_rover2");
    console.log("stop emit_rover2");
  };
  const stopvideo_rover3 = () => {
    socket.emit("stopvideo_rover3");
    console.log("stop emit_rover3");
  };

  useEffect(() => {
    socket.on("video_image", (payload) => {
      setImage(payload);
    });
    socket.on("video_image_rover", (payload) => {
      setImage(payload);
    });
    socket.on("video_image_rover2", (payload) => {
      setImage(payload);
    });
    socket.on("video_image_rover3", (payload) => {
      setImage(payload);
    });
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
      });yaw
    });
    socket.on("telemetryServer_rover2", (data) => {
      settimeofflight(timeofflight + 1);
      setTelemetryData_rover2((prevData) => {
        return { ...prevData, ...data };
      });
    });
    socket.on("telemetryServer_rover3", (data) => {
      settimeofflight(timeofflight + 1);
      setTelemetryData_rover3((prevData) => {
        return { ...prevData, ...data };
      });
    });

    socket.on("data", (data) => {
      setData(data);
    });

    socket.on("data_ugv", (data) => {
      setData_ugv(data);
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
  });

  return (
    <telemContext.Provider
      value={{
        goto_command,
        goto_command_rover,
        goto_command_rover2,
        goto_command_rover3,
        auto_command,
        auto_command_rover,
        auto_command_rover2,
        auto_command_rover3,
        landUAV,
        RTL,
        RTL_rover,
        RTL_rover2,
        RTL_rover3,
        STOP_rover,
        STOP_rover2,
        STOP_rover3,
        button,
        write_mission,
        write_mission_rover,
        write_mission_rover2,
        write_mission_rover3,
        downloadMission,
        downloadMission_rover,
        downloadMission_rover2,
        downloadMission_rover3,
        readMission,
        readMission_rover,
        readMission_rover2,
        readMission_rover3,
        uploadMission,
        uploadMission_rover,
        uploadMission_rover2,
        uploadMission_rover3,
        saveMission,
        saveMission_rover,
        saveMission_rover2,
        saveMission_rover3,
        start_Telem,
        stop_Telem,
        start_Telem_rover,
        stop_Telem_rover,
        start_Telem_rover2,
        stop_Telem_rover2,
        start_Telem_rover3,
        stop_Telem_rover3,
        flyUav,
        armUav,
        disarmUav,
        armUgv,
        armUgv2,
        armUgv3,
        disarmUgv,
        disarmUgv2,
        disarmUgv3,
        stopRover,
        stopRover2,
        stopRover3,
        telemetryData,
        telemetryData_rover,
        telemetryData_rover2,
        telemetryData_rover3,
        OdlcData,
        roll,
        pitch,
        yaw,
        setroll,
        setpitch,
        setyaw,
        mode,
        timeofflight,
        pointsdata,
        startvideo,
        stopvideo,
        startvideo_rover,
        stopvideo_rover,
        startvideo_rover2,
        stopvideo_rover2,
        startvideo_rover3,
        stopvideo_rover3,
        image,
        set_Guided,
        flyMission,
        data,
        data_ugv,
        write_map,
      }}
    >
      {children}
    </telemContext.Provider>
  );
};
export { TelemState };