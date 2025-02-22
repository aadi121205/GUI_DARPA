import { useState, useEffect, useContext } from "react";
import telemContext from "./telemContext";
import { SocketContext } from "../SocketContext";

const TelemState = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [telemetryData, setTelemetryData] = useState({});
  const [mode, setMode] = useState("danger");
  const [timeofflight, setTimeofflight] = useState(0);
  const [button, setButton] = useState(false);

  const goto_command = () => {
    socket.emit("mission_goto");
  };

  const auto_command = () => {
    socket.emit("mission_auto");
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

  const flyMission = () => {
    socket.emit("flyMission");
  };

  const write_mission = (data) => {
    socket.emit("write_mission", data);
    console.log(data);
  };

  const write_map = (data) => {
    socket.emit("write_map", data);
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

  const stopUAV = () => {
    setButton(true);
    socket.emit("stopUAV");
  };

  const RTL = () => {
    socket.emit("setRTL");
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

  const set_Guided = () => {
    socket.emit("set_Guided");
  };

  useEffect(() => {
    socket.on("telemetryServer", (data) => {
      if (data.altitude > 0.1) {
        setTimeofflight((prev) => prev + 1);
      }
      setTelemetryData((prevData) => ({ ...prevData, ...data }));
    });
  }, [socket]);

  return (
    <telemContext.Provider
      value={{
        goto_command,
        auto_command,
        landUAV,
        RTL,
        button,
        write_mission,
        downloadMission,
        readMission,
        uploadMission,
        saveMission,
        start_Telem,
        stop_Telem,
        flyUav,
        armUav,
        disarmUav,
        stopUAV,
        telemetryData,
        startvideo,
        stopvideo,
        set_Guided,
        flyMission,
        write_map,
      }}
    >
      {children}
    </telemContext.Provider>
  );
};

export { TelemState };
