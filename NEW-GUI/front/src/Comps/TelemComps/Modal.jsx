import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { RiCameraLensFill } from "react-icons/ri";
import { Rnd } from "react-rnd";
import { RiCloseCircleLine } from "react-icons/ri";

export default function Modal() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState("");


  const handleOpen = () => {
    setIndex(index + 1);
    console.log(index);
    if (index % 2 === 0) {
      setOpen(true);
      startvideo();
    } else {
      setOpen(false);
      stopvideo();
    }
  };

  const style = {
    display: "flex",
    border: "solid 1px #ddd",
    background: "rgb(0 0 0 / 50%)",
    width: "full",
    flexDirection: "column",
    padding: "3px",
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <RiCameraLensFill style={{ fontSize: 30, color: "white" }} />
      </Button>
      {open && (
        <>
        <Rnd
          style={style}
          default={{
            x: 200,
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
                    <Button 
                    style={{ position: "absolute", top: 0, right: 0, color: "white" }}
                    >
                      <h3>Take Off</h3>
                    </Button>
                    <Button
                    style={{ position: "absolute", top: 0, left: 0, color: "white" }}
                    >
                      <h3>Take Off</h3>
                    </Button>
                    <Button
                    style={{ position: "absolute", bottom: 0, right: 0, color: "white" }}
                    >
                      <h3>Take Off</h3>
                    </Button>
                    <Button
                    style={{ position: "absolute", bottom: 0, left: 0, color: "white" }}
                    >
                      <h3>Take Off</h3>
                    </Button>
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
