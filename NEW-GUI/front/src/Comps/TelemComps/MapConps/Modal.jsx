import React, { useState } from "react";
import { Button } from "@mui/material";
import { RiCloseCircleLine } from "react-icons/ri";
import { Rnd } from "react-rnd";
import Timer from "./Timer";

export default function TimerModal() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const modalStyle = {
    display: "flex",
    border: "solid 1px #ddd",
    background: "rgba(0, 0, 0, 0.85)",
    flexDirection: "column",
    padding: "4px",
    position: "fixed",
    zIndex: 1000,
    textAlign: "center",
    color: "white",
    borderRadius: "10px",
    fontSize: "25px",
  };

  return (
    <div>
      {isOpen && (
        <Rnd
          style={modalStyle}
          default={{
            x: window.innerWidth/2.65,
            y: 0,
            width: window.innerWidth/10,
            height: window.innerHeight/13,
          }}
          bounds="window" // Ensure the modal stays within the window boundaries
        >
          <div
            style={{
              position: "absolute", // Ensure the div fits within the Rnd component
              width: "100%",
              height: "80%",
            }}
          >
            <Timer />
          </div>
          <Button
            onClick={toggleModal}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
            }}
          >
            <RiCloseCircleLine style={{ fontSize: 20 }} />
          </Button>
        </Rnd>
      )}
    </div>
  );
}