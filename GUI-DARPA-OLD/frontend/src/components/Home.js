import * as React from 'react';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
import Map from './Map/Map';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

export default function Home() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header/>
      <Sidebar/>
      <Map/>
    </Box>
  );
}