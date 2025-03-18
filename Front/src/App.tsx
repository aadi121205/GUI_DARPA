import React from "react";
import { SocketProvider } from "./Comps/SocketProvider";
import TelemetryDisplay from "./Comps/TelemetryDisplay";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Comps/Nav";

const Home = () => (
  <>
    <SocketProvider>
      <div>
        <h1>UAV Telemetry Dashboard</h1>
        <TelemetryDisplay />
      </div>
    </SocketProvider>
  </>
);
const About = () => <h1>About Page</h1>;
const NotFound = () => <h1>404 - Not Found</h1>;

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
