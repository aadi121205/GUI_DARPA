import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import suas_logo from "../assets/darpa_logo.png";
import uas_logo from "../assets/uas_logo.png";

const pages = ["Telem", "Logs", "Stats"];
const links = ["/telem", "/logs", "/stats"];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:"#0D101B" }}
    >
      <Container maxWidth="xll">
        <Toolbar disableGutters>
          <Tooltip title="UAS-DTU">
            <Box
              component="img"
              sx={{ height: 40, mr: 6 }}
              alt="UAS DTU"
              src={uas_logo}
            />
          </Tooltip>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0}}>
            <Tooltip title="DARPA 2024">
              <Box
                component="img"
                sx={{
                  height: 50,
                }}
                alt="DARPA"
                src={suas_logo}
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
