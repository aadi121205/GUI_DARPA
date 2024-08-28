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
    background: "rgb(0 0 0 / 80%)",
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
            <Button variant="primary" onClick={vehicle.flymission}>Fly Mission</Button>
            <Button variant="primary" onClick={vehicle.takeoff}>Arm & Takeoff</Button>
            <Button variant="primary" onClick={vehicle.rtl}>Emergency Stop</Button>
            <Button variant="primary" onClick={vehicle.uploadMission}>Upload Mission</Button>
            <Button
              onClick={handleOpen}
              style={{ position: "absolute", top: 0, right: 0, color: "white" }}
            >
              <RiCloseCircleLine style={{ fontSize: 30 }} />
            </Button>
          </Rnd>
        </>
      )}
    </div>
  );
}
export default Modal;