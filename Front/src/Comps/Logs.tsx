import React from "react";
import { useSocket } from "./SocketProvider";
import { useState, useEffect } from "react";

const LogsDisplay: React.FC = () => {
  const { Data } = useSocket();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4>Logs</h4>
      <div
        style={{
          padding: "1rem",
          fontSize: "1.5rem",
          marginLeft: "1.7rem",
          overflowY: "auto",
          maxHeight: "30vh",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          backgroundColor: "#1a1f1f",
        }}
      >
        {isVisible ? (
          <pre>{Data?.msg ?? "No data available"}</pre>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default LogsDisplay;
