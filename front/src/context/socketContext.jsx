import { createContext ,useEffect} from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

const SocketContext = createContext();

const socket = io(SOCKET_URL+'/react');

const SocketState = ({children})=>{
    
    // useEffect(() => {
    //     // Log data received from the socket
    //     const logReceivedData = (event, data) => {
    //         console.log(`Received event: ${event}`, data);
    //     };

    //     // Add listeners for known events
    //     socket.on('telemetryServer_rover', (data) => {
    //         logReceivedData('telemetryServer_rover', data);
    //     });
    //     socket.on('telemetryServer_rover2', (data) => {
    //         logReceivedData('telemetryServer_rover2', data);
    //     });
    //     socket.on('telemetryServer_rover3', (data) => {
    //         logReceivedData('telemetryServer_rover3', data);
    //     });
    //     return () => {
    //         socket.off('telemetryServer_rover', logReceivedData);
    //         socket.off('telemetryServer_rover2', logReceivedData);
    //         socket.off('telemetryServer_rover3', logReceivedData);
    //     };
    // }, []);

    // useEffect(() => {
    //     // Log data received from the socket
    //     const logReceivedData = (event, data) => {
    //       console.log(`Received event: ${event}`, data);
    //     };
    
    //     // Add listeners for known events
    //     socket.onAny((event, data) => {
    //       logReceivedData(event, data);
    //     });
    
    //     // Cleanup listeners on unmount
    //     return () => {
    //       socket.offAny(logReceivedData);
    //     };
    //   }, []);
    // console.log(children);
    return(
        <div>
            <SocketContext.Provider value={{ socket }}>
                {children}
            </SocketContext.Provider>
        </div>
    )
};

export {SocketContext,SocketState}