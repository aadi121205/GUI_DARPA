import React from "react";
import { Box } from "@mui/material";

import { Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TbDrone } from "react-icons/tb";
import { CiMedicalClipboard } from "react-icons/ci";
import { IoLogoGameControllerA } from "react-icons/io";


const iconLinks = [
  {
    icon: <TbDrone fontSize="inherit" />,
    to: "/drone",
  },
  {
    icon: (<img src="Rover.svg" alt="Antenna Icon" style={{ width: "30%", height: "10%" }} />),
    to: "/rover",
  },
  {
    icon: <CiMedicalClipboard fontSize="inherit" />,
    to: "/triage",
  },
  {
    icon: <IoLogoGameControllerA fontSize="inherit" />,
    to: "/piliot",
  },
  {
    icon: <Settings fontSize="inherit" />,
    to: "/settings",
  },
];

export default function App() {
  React.useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        bgcolor: "#000000",
        overflow: "hidden",
      }}
    >
      {iconLinks.map(({ icon, to }, idx) => (
        <Link
          to={to}
          key={idx}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            height: "100%",
            width: "100%",
            // Prevent blue highlight on click (mobile)
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#2b4d5c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: { xs: "15vw", sm: "12vw", md: "8vw", lg: "7vw" },
              color: "#fffffe",
              borderRight:
                idx < iconLinks.length - 1 ? "2px solid #282a36" : "none",
              m: 0,
              p: 0,
              transition: "background 0.2s, box-shadow 0.2s, color 0.2s",
              "&:hover": {
                bgcolor: "#000000",
                boxShadow: "0 4px 24px 0 rgba(50,50,50,0.15)",
              },
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {icon}
          </Box>
        </Link>
      ))}
    </Box>
  );
}
