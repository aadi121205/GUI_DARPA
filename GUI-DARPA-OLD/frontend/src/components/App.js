import React from "react";
import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Home from "./Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
  palette: {
    primary: {
      main:"#1A2731",
    },
    secondary: {
      main: "#1A2731",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <SocketState>
        <TelemState>
          <Home />
        </TelemState>
      </SocketState>
    </ThemeProvider>
  );
};

export default App;
