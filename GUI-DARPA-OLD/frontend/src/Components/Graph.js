import React, { useContext } from 'react';
import { LineChart, XAxis, CartesianGrid, YAxis, Line } from 'recharts';
import telemContext from '../context/home/telemContext';

function Graph() {
    const pointsdata = useContext(telemContext);
    return (
        <div>
            <LineChart width={600} height={430} data={pointsdata.pointsdata}>
                <XAxis dataKey="x" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                {/* <Line type="linear" dataKey="x" stroke="red" animationDuration={1000}/> */}
                <Line type="linear" dataKey="y" stroke="red" animationDuration={1000} />
            </LineChart>
        </div>
    )
}

export default Graph