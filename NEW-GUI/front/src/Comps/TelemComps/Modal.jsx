import { Button } from "@mui/material";
import React, { useState } from "react";
import { RiCameraLensFill } from "react-icons/ri";
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
        <RiCameraLensFill style={{ fontSize: 30, color: "white" }} />
      </Button>
      {open && (
        <>
          <Rnd
            className="ontop"
            style={style}
            default={{
              x: 200,
              y: -80,
              width: 320,
              height: 200,
            }}
          >
            <Button variant="primary" onClick={vehicle.arm}>{vehicle.armed ? "Disarm" : "Arm"}</Button>
            <Button variant="primary" onClick={vehicle.rtl}>RTL</Button>
            <Button variant="primary" onClick={vehicle.land}>Land</Button>
            <Button variant="primary" onClick={vehicle.goto}>Goto</Button>
            <Button
              onClick={handleOpen}
              style={{ position: "absolute", top: 0, right: 0, color: "white" }}
            >
              <RiCloseCircleLine style={{ fontSize: 30 }} />
            </Button>
          </Rnd>
          <Rnd
            style={style}
            default={{
              x: 600,
              y: -80,
              width: 320,
              height: 200,
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <img
                src="src/assets/darpa_logo.png"
                alt="Camera Feed"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
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