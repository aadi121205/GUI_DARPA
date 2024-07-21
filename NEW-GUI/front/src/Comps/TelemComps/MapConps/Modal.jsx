import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { RiCameraLensFill } from "react-icons/ri";
import { Rnd } from "react-rnd";
import { RiCloseCircleLine } from "react-icons/ri"
import ColorsTimeline from "./Timeline";
import Timer from "./Timer";

export default function Modal() {
  const [open, setOpen] = useState(true);
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
      {open && (
        <>
                <Rnd
                style={style}
                default={{
                  x: 0,
                  y: 1217,
                  width: 1213,
                  height: 100,
                }}
              >
                <div style={{ position: "absolute", width: "100%", height: "100%", paddingTop: "20px" }}>
                  <Timer/>
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
