import React from "react";
import { useSocket } from "./SocketProvider";


const LogsDisplay: React.FC = () => {
  const { Data } = useSocket();

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #444",
        borderRadius: "7px",
        margin: "1rem",
        width: "46vw",
        backgroundColor: "#1a1a1a",
        color: "#f0f0f0",
        height: "22vh",
      }}
    >
      <h2>Data</h2>
      <pre>{JSON.stringify(Data, null, 2)}</pre>
      {Data.msg}
      <br />
      {Data.error}
      <br />
    </div>
  );
};

export default LogsDisplay;
