import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Divider from "@mui/material/Divider";
import React from 'react';
import MyDropdown from './Dropdown';
import MyDropdown2 from './Dropdown2';



export default function Contexp(){
    return (
        <>
        <Row>
            <Col>
            <h1>row 1 col 1</h1>

            </Col>
            <Col>
                <h1>row 1 col 2</h1>
            </Col>
        </Row>
        <Row>
            <Col>
            <MyDropdown/>
            </Col>
            <Col>
            <h1>row 2 col 2</h1>
            <MyDropdown2/>
            </Col>
        </Row>
        </>
        );
}
