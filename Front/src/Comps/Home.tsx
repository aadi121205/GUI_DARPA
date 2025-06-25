import React from "react";
import { Box } from "@mui/material";
import Telemicon from "/drone.svg";
import { Star, Favorite, Person, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

const iconLinks = [
  {
    icon: (
      <img
        src={Telemicon}
        alt="Telemicon"
        style={{
          width: "40%",
          height: "40%",
          objectFit: "contain",
          display: "block",
        }}
      />
    ),
    to: "/telem",
  },
  {
    icon: <Star fontSize="inherit" />,
    to: "/star",
  },
  {
    icon: <Favorite fontSize="inherit" />,
    to: "/favorite",
  },
  {
    icon: <Person fontSize="inherit" />,
    to: "/person",
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
        bgcolor: "#282a36",
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
              bgcolor: "#232946",
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
                bgcolor: "#eebbc3",
                color: "#232946",
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
