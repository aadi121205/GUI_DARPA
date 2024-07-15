import * as React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container style={{ padding: "3px", display: "flex", justifyContent: "flex-start", alignItems: "left", margin: "0.5px", paddingLeft: "30px"}}>
                <Navbar.Brand href="/">
                    <img
                        src= "src/assets/uas_logo.png" // replace with the path to your image
                        width="120"
                        height="50"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/telem">Telem</Nav.Link>
                        <Nav.Link href="/control">Controls</Nav.Link>
                        <Nav.Link href="/data">Data</Nav.Link>
                        <Nav.Link href="/test">Test</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Container style={{ padding: "3px", display: "flex", justifyContent: "flex-end", alignItems: "center", margin: "0.5px", paddingLeft: "0px" }}>
              <Navbar.Brand href="https://triagechallenge.darpa.mil/">
                  <img
                      src="src/assets/darpa_logo.png" // replace with the path to your image
                      width="140"
                      height="50"
                      alt="Logo"
                  />
              </Navbar.Brand>
            </Container>

        </Navbar>

  );
}

export default NavigationBar;
