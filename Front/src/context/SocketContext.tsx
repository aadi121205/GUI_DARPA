import { createContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
// If '../config' does not exist, create it or replace the import with a placeholder value
import { SOCKET_URL } from "../config";

// Define the type for received data
type ReceivedData = {
    event: string;
    data: any;
};

// Define the context type
interface SocketContextType {
    socket: Socket;
    receivedData: ReceivedData[];
}

// Create a context to be used in other components
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Initialize the socket connection
const socket: Socket = io(`${SOCKET_URL}/react`, {
    secure: true,
    rejectUnauthorized: false, // Allow self-signed/unauthorized certificates
});

interface SocketStateProps {
    children: ReactNode;
}

const SocketState = ({ children }: SocketStateProps) => {
    const [receivedData, setReceivedData] = useState<ReceivedData[]>([]);

    useEffect(() => {
        // Handle data received from the socket
        const handleReceivedData = (event: string, data: any) => {
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
