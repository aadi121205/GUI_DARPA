import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { RiCameraLensFill } from "react-icons/ri";
import { Rnd } from "react-rnd";
import { RiCloseCircleLine } from "react-icons/ri";
import telemContext from "../context/home/telemContext";

export default function Modal() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const { startvideo, stopvideo, image } = useContext(telemContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (image) {
        const base64String = arrayBufferToBase64(image);
        setImageSrc(`data:image/jpeg;base64,${base64String}`);
      }
    }, 1000 / 30); // 30 fps

    return () => clearInterval(interval);
  }, [image]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

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
    background: "rgb(35 55 75 / 90%)",
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
        <Rnd
          style={style}
          default={{
            x: -200,
            y: 100,
            width: 320,
            height: 200,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={imageSrc}
              alt="Camera Feed"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Button
              onClick={handleOpen}
              style={{ position: "absolute", top: 0, right: 0, color: "white" }}
            >
              <RiCloseCircleLine style={{ fontSize: 30 }} />
            </Button>
          </div>
        </Rnd>
      )}
    </div>
  );
}
