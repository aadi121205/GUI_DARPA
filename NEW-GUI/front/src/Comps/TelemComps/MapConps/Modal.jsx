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
      {isOpen && (
        <Rnd
          style={modalStyle}
          default={{
            x: 0,
            y: 1217,
            width: 1213,
            height: 100,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              paddingTop: "20px",
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
            <RiCloseCircleLine style={{ fontSize: 30 }} />
          </Button>
        </Rnd>
      )}
    </div>
  );
}
