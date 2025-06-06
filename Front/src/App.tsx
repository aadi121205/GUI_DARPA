import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Comps/Nav";
import Telem from "./Comps/Telem";
import TelemUgv from "./Comps/TelemUgv";
import Home from "./Comps/Home";

const NotFound = () => <h1>404 - Not Found</h1>;

const App: React.FC = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/telem" element={<Telem />} />
        <Route path="/telemugv" element={<TelemUgv />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
