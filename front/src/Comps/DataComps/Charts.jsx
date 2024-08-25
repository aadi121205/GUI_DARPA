import * as React from "react";
import { useEffect, useState, useContext } from "react";
import DifferentLength from "./Chart";
import telemContext from "../../context/home/telemContext";

function Length() {
  const {
    data,
    telemetryData,
    telemetryData_rover,
    telemetryData_rover2,
    telemetryData_rover3,
  } = useContext(telemContext);
  console.log(data);

  return (
    <div style={{ padding: "20px", display: "flex" }}>
      <div style={{ flex: 1 }}>
        <DifferentLength />
      </div>
    </div>
  );
}

export default Length;
