import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Comps/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Telem from "./Comps/Telem";
import Data from "./Comps/Data";
import Home from "./Comps/Home";
import Test from "./Comps/Test";
import TestUgv from "./Comps/TestUgv";
import TestUgv2 from "./Comps/TestUgv2";
import TestUgv3 from "./Comps/TestUgv3";
import Control from "./Comps/Control";
import FD from "./Comps/FlightDirector";
import Camera from "./Comps/Camera";
import Path from "./Comps/Path";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/telem" element={<Telem />} />
        {/* <Route path="/Data" element={<Data />} /> */}
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/test2" element={<TestUgv />} />
        <Route path="/test3" element={<TestUgv2 />} />
        <Route path="/test4" element={<TestUgv3 />} />
        <Route path="/control" element={<Control />} />
        <Route path="/camera" element={<Camera />} />
        {/* <Route path="/fd" element={<FD />} /> */}
        {/* <Route path="/path" element={<Path />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
