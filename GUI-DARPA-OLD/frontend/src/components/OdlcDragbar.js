import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { MdOpenInBrowser } from "react-icons/md";
import { TbArrowAutofitDown } from "react-icons/tb";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [index,setIndex] = React.useState(0)
  const [logo,setlogo] = React.useState(false)

  const toggleDrawer = () => {
    setIndex(index+1)
    console.log(index)
    if(index%2===0){
        setState({ ...state, bottom: !state.bottom });
        setlogo(true)
    }
    else{
        setState({ ...state, bottom: !state.bottom });
        setlogo(false)
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: '100vw', // Set width to 100% of viewport width
        height: '100px', // Adjust height as needed
        backgroundColor: '#0D101B', // Set background color to black
        color: 'white', // Set text color to white
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Odlc Display</h2>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer}>
        {!logo ? (
            <MdOpenInBrowser style={{ fontSize: 30, color: "white" }} />
        ):(
            <TbArrowAutofitDown style={{ fontSize: 30, color: "white" }} />
        )}
      </Button>
      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {drawerContent}
      </SwipeableDrawer>
    </div>
  );
}
