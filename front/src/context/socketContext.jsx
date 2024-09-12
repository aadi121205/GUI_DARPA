import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

// Create a context to be used in other components
const SocketContext = createContext();

// Initialize the socket connection
const socket = io(`${SOCKET_URL}/react`, {
    secure: true,
    rejectUnauthorized: false, // Allow self-signed/unauthorized certificates
  });
  
const SocketState = ({ children }) => {
    const [receivedData, setReceivedData] = useState([]);

    useEffect(() => {
        // Handle data received from the socket
        const handleReceivedData = (event, data) => {
            setReceivedData(prevData => [...prevData, { event, data }]);
        };

        // Add listener for all socket events
        socket.onAny(handleReceivedData);

        // Cleanup listeners on unmount
        return () => {
            socket.offAny(handleReceivedData);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, receivedData }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketState };
