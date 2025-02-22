import { createContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../Config";

// Create a context to be used in other components
interface SocketContextType {
    socket: Socket;
    receivedData: { event: string; data: any }[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Initialize the socket connection
const socket: Socket = io(SOCKET_URL, {
    rejectUnauthorized: false, // Allow self-signed/unauthorized certificates
});

const SocketState = ({ children }: { children: ReactNode }) => {
    const [receivedData, setReceivedData] = useState<{ event: string; data: any }[]>([]);

    useEffect(() => {
        const handleReceivedData = (event: string, data: any) => {
            setReceivedData(prevData => [...prevData, { event, data }]);
        };

        // Listen to all socket events
        socket.onAny(handleReceivedData);

        // Cleanup function to remove event listeners on unmount
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
