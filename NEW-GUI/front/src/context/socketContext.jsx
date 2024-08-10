import { createContext ,useEffect,useState} from "react";
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
    return(
        <div>
            <SocketContext.Provider value={{ socket }}>
                {children}
            </SocketContext.Provider>
        </div>
    )
};

const data_socket = io(SOCKET_URL + '/data');

// Create a context to provide the socket to the rest of the application
const DataSocketContext = createContext();

const DataSocketState = ({ children }) => {
    const [dataRover1, setDataRover1] = useState(null);
    const [dataRover2, setDataRover2] = useState(null);
    const [dataRover3, setDataRover3] = useState(null);

    useEffect(() => {
        
        
        data_socket.on('dataRover1', (data) => {
            // console.log('Data from Rover 1:', data);
            setDataRover1(data);
        });

        data_socket.on('dataRover2', (data) => {
            setDataRover2(data);
            // console.log('Data from Rover 2:', data);
        });

        data_socket.on('dataRover3', (data) => {
            // console.log('Data from Rover 3:', data);
            setDataRover3(data);
        });

        // Clean up the listeners when the component is unmounted
        return () => {
            data_socket.off('dataRover1');
            data_socket.off('dataRover2');
            data_socket.off('dataRover3');
        };
    }, []);

    return (
        <DataSocketContext.Provider value={{ dataRover1, dataRover2, dataRover3 }}>
            {children}
        </DataSocketContext.Provider>
    );
};

export {SocketContext,SocketState,DataSocketContext,DataSocketState};