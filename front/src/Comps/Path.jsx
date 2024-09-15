import React from "react";
import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Pathexp from "./PathComps/Pathexp";

export default function Path() {
  return (
    <SocketState>
      <TelemState>
        <Pathexp />
      </TelemState>
    </SocketState>
  );
}
