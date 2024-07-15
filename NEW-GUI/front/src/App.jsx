import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Comps/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Telem from './Comps/Telem';
import Data from './Comps/Data';
import Home from './Comps/Home';
import Sidebar from './Comps/Test';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/telem" element={<Telem />} />
        <Route path="/Data" element={<Data />} />
        <Route path="/test" element={<Sidebar />} />
      </Routes>
      </Router>
  );
};

export default App;