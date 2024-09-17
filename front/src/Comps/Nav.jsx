import * as React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container
        style={{
          padding: "3px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "left",
          margin: "0.5px",
          paddingLeft: "30px",
        }}
      >
        <Navbar.Brand href="/">
          <img
            src="src/assets/uas_logo.png" // replace with the path to your image
            width="120"
            height="50"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          bg="dark"
          variant="dark"
          expand="lg"
          id="basic-navbar-nav"
        >
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/telem">Telem</Nav.Link>
            <Nav.Link href="/control">Controls</Nav.Link>
            <Nav.Link href="/data">Data</Nav.Link>
            <Nav.Link href="/camera">Camera</Nav.Link>
            <Nav.Link href="/path">Path</Nav.Link>
            <Nav.Link href="/fd">Flight Director</Nav.Link>
            <Nav.Link href="/test">Test</Nav.Link>
            <NavDropdown title="Test" id="basic-nav-dropdown">
              <NavDropdown.Item href="/test2">Test UGV</NavDropdown.Item>
              <NavDropdown.Item href="/test3">Test UGV 2</NavDropdown.Item>
              <NavDropdown.Item href="/test4">Test UGV 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container
        style={{
          padding: "3px",
          display: "flex",
          justifyContent: "flex-end",
          paddingLeft: "0px",
          overflow: "hidden",
        }}
      >
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
