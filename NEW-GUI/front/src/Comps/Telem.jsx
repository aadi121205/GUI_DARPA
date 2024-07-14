import * as React from "react";
import Teleminfo from "./TelemComps/Teleminfo";
import Map from "./TelemComps/Map";
import Divider from "@mui/material/Divider";
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

function Telem() {
    return (
        <div className="tab">
        <Row style={{ padding: "24px", backgroundColor: "black"}}>
            <Col style={{ padding: "5px", backgroundColor: "black"}}>
                <Container bg="dark" style={{padding: "2px", justifyContent: "flex-start", alignItems: "left", paddingLeft: "0px", backgroundColor: "black", color: "white"}}>
                    <Teleminfo />
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo />
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo />
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo />
                    <Divider style={{ backgroundColor: 'white', height: "5px"}} />
                    <Teleminfo />
                </Container>
            </Col>
            <Col>
                <Container style={{ padding: "0px", overflow: "hidden",margin: "0px", paddingLeft: "0px", backgroundColor: "black"}}>
                <Map />
                </Container>
            </Col>
        </Row>
         </div>
                );
    }

export default Telem;