import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Comps/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Telem from './Comps/Telem';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Telem />} />
      </Routes>
      </Router>
  );
};

export default App;