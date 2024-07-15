import { createContext } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

const SocketContext = createContext();

const socket = io(SOCKET_URL+'/react');

const SocketState = ({children})=>{
    console.log("SocketState");
    return(
        <div>
            <SocketContext.Provider value={{ socket }}>
                {children}
            </SocketContext.Provider>
        </div>
    )
};

export {SocketContext,SocketState}