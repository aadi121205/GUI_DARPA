import React from "react";
import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Contexp from "./ControlComps/Contexp";
import Telemexp from "./TelemComps/Teleexp";

export default function Control() {
  return (
    <SocketState>
      <TelemState>
        <Contexp />
      </TelemState>
    </SocketState>
  );
}
