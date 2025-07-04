import "./App.css";
import { SocketState } from "./context/SocketContext";
import { TelemState } from "./context/home/TelemState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Comps/Home";
import Drone from "./Comps/Drone";

function App() {
  return (
    <>
      <SocketState>
        <TelemState>
          <Router>
            <Routes>
              {/* Nested routes can be added here if needed */}
              <Route path="/" element={<Home />} />
              <Route path="/drone" element={<Drone />} />
              {/* Add more routes as needed */}
            </Routes>
          </Router>
        </TelemState>
      </SocketState>
    </>
  );
}

export default App;
