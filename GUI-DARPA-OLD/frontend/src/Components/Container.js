import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Hud from "./Hud";
import Graph from './Graph';
import Video from '../Assets/Vid.webm'
import telemContext from '../context/home/telemContext';
import SS from '../Assets/SS.png'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Container() {
  const {button} = React.useContext(telemContext)
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Toolbar />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* <Grid item xs={6}>
          <Item>
            <Hud />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Graph />
          </Item>
        </Grid> */}
        <Grid item xs={6}>
          <Item>
            {!button && (
            <video style={{ height: "883px", width: "206%" }} src={Video}></video>
            )}
            {button && (
              <img src={SS} alt="" />
            )}
          </Item>
        </Grid>
        {/* <Grid item xs={6}>
          <Item><Graph /></Item>
        </Grid> */}
      </Grid>
    </Box>
  );
}