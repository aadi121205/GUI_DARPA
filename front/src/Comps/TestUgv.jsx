import * as React from "react";
import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Side from "./TestUgvComps/side";

export default function TestUgv() {
  return (
    <SocketState>
      <TelemState>
        <Side />
      </TelemState>
    </SocketState>
  );
}