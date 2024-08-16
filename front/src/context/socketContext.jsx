import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

// Create a context to be used in other components
const SocketContext = createContext();

// Initialize the socket connection
const socket = io(`${SOCKET_URL}/react`);

const SocketState = ({ children }) => {
    useEffect(() => {
        // Log data received from the socket
        const logReceivedData = (event, data) => {
            console.log(`Received event: ${event}`, data);
        };

        // Add listener for all socket events
        socket.onAny(logReceivedData);

        // Cleanup listeners on unmount
        return () => {
            socket.offAny(logReceivedData);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketState };
