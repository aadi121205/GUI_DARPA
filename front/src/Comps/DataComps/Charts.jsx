import * as React from 'react';
import DifferentLength from './Chart';

function Length() {
    return (
        <div style={{ padding: "20px" , display: "flex"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "40px", paddingLeft: "40px"}}><h1 style={{}}>P1</h1></div>
            <DifferentLength />
            <DifferentLength />
            <DifferentLength />
        </div>
    );
}

export default Length;