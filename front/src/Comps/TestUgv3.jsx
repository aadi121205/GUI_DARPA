import * as React from "react";
import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Side from "./TestUgv3Comps/side";

export default function TestUgv2() {
  return (
    <SocketState>
      <TelemState>
        <Side />
      </TelemState>
    </SocketState>
  );
}