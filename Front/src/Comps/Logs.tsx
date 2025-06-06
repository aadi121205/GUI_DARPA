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
        backgroundColor: "#1a1a1a",
        color: "#f0f0f0",
      }}
    >
      <h4>Logs</h4>
      <div
        style={{
          padding: "1rem",
          fontSize: "1.5rem",
          marginLeft: "1.7rem",
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
