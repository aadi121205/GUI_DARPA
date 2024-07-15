import * as React from "react";
import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Side from "./TestComps/side";

export default function Sidebar() {
  return (
    <SocketState>
      <TelemState>
        <Side />
      </TelemState>
    </SocketState>
  );
}