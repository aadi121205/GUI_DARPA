import { Button } from "@mui/material";
import React, { useState } from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { Rnd } from "react-rnd";
import { RiCloseCircleLine } from "react-icons/ri";
import telemContext from "../../context/home/telemContext";
import { fontSize, textAlign } from "@mui/system";

const Modal = ({ vehicle }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleOpen = () => {
    setIndex(index + 1);
    console.log(index);
    if (index % 2 === 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const style = {
    display: "flex",
    border: "solid 1px #ddd",
    background: "rgb(0 0 0 / 65%)",
    flexDirection: "column",
    padding: "3px",
    position: "fixed",
    zIndex: 1000,
    textAlign: "center",
    color: "white",
    borderRadius: "10px",
    fontSize: "40px",
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <RiSettings4Fill style={{ fontSize: 30, color: "white" }} />
      </Button>
      {open && (
        <>
          <Rnd
            className="ontop"
            style={style}
            default={{
              x: 200,
              y: -80,
              width: 300,
              height: 200,
            }}
          >
            <Button variant="primary" onClick={vehicle.arm}>{vehicle.armed ? "Disarm" : "Arm"}</Button>
            <Button variant="primary" onClick={vehicle.goto}>Goto</Button>
            <Button variant="primary" onClick={vehicle.flymission}>Fly Mission</Button>
            <Button variant="primary" onClick={vehicle.takeoff}>Arm & Takeoff</Button>
            <Button variant="primary" onClick={vehicle.rtl}>Emergency Stop</Button>
            <Button
              onClick={handleOpen}
              style={{ position: "absolute", top: 0, right: 0, color: "white" }}
            >
              <RiCloseCircleLine style={{ fontSize: 30 }} />
            </Button>
          </Rnd>
{/*           <Rnd
            style={style}
            default={{
              x: 600,
              y: -80,
              width: 330,
              height: 400,
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <h3>Altitude: {vehicle.altitude} m</h3>
              <h3>Velocity: {vehicle.velocity} m/s</h3>
              <h3>Mode: {vehicle.mode}</h3>
              <h3>State: {vehicle.state}</h3>
              <h3>Status: {vehicle.status}</h3>
              <h3>Throttle: {vehicle.throttle}</h3>
              <h3>Signal Strength: {vehicle.signalStrength}</h3>
              <h3>Displacement: {vehicle.displacment} m</h3>
            </div>
            <Button
              onClick={handleOpen}
              style={{ position: "absolute", top: 0, right: 0, color: "white" }}
            >
              <RiCloseCircleLine style={{ fontSize: 30 }} />
            </Button>
          </Rnd> */}
        </>
      )}
    </div>
  );
}
export default Modal;