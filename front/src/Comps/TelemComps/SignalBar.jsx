import React from 'react';
import './Bar.scss';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SignalBars = ({ st }) => {
    const bars = [];
    for (let i = 0; i < 5; i++) {
        if (st.signalStrength > i) {
            bars.push(<div key={i} className="bar"></div>);
        }
    }

    return (
        <>
        <div id="topbar">
            <div id="bars">
                {bars}
            </div>
        </div>
        <br></br>
        <br></br>
        <h5 style = {{ color: "green", alignItems: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{st.ip}</h5>
        </>
    );
};

export default SignalBars;
