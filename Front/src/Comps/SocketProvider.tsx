import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  telemetryData: any;
  Data: any;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [telemetryData, setTelemetryData] = useState<any>(null);
  const [Data, setData] = useState<any>(null);

  useEffect(() => {
    const newSocket = io("https://localhost:7000/react", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("TelemFowarding", (data) => {
      console.log("Received telemetry data:", data);
      setTelemetryData(data);
    });

    newSocket.on("DataFowarding", (data) => {
      console.log("Received Data:", data);
      setData(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, telemetryData, Data }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
