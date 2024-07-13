import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Comps/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
      </Routes>
      </Router>
  );
};

export default App;