import React, { useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

function UAVButtons(){
return(
    <>
        <Row className="mb-3">
            <Col>
                <Button variant="success" className="w-100">ARM</Button>
            </Col>
            <Col>
                <Button variant="danger" className="w-100">DISARM</Button>
            </Col>
            <Col>
                <Button variant="primary" className="w-100">Takeoff</Button>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
                <Button variant="primary" className="w-100">Land</Button>
            </Col>
            <Col>
                <Button variant="primary" className="w-100">RTL</Button>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
                <Button variant="danger" className="w-100 fs-3">Force Disarm</Button>
            </Col>
        </Row>
    </>
);
}

export default UAVButtons;