import "./App.css";
import { SocketState } from "./context/SocketContext";
import { TelemState } from "./context/home/TelemState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Comps/Home";

function App() {
  return (
    <>
      <SocketState>
        <TelemState>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>

        </TelemState>
      </SocketState>
    </>
  );
}

export default App;
