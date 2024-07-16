import React from 'react';
import './Bar.scss';

const SignalBars = ({ st }) => {
    const bars = [];
    for (let i = 0; i < 5; i++) {
        if (st > i) {
            bars.push(<div key={i} className="bar"></div>);
        }
    }

    return (
        <div id="topbar">
            <div id="bars">
                {bars}
            </div>
        </div>
    );
};

export default SignalBars;
