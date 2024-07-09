import React, { useContext, useState } from 'react'
import telemContext from '../context/home/telemContext';
import { SOCKET_URL } from '../config';

const Data = () => {

    const { OdlcData } = useContext(telemContext);
    const [index, setIndex] = useState(0);

    const fetch_next = () => {
        setIndex(index + 1);
    }
    const fetch_last = () => {
        setIndex(index - 1);
    }
    // console.log(OdlcData[index].imgUrl);
    // console.log(OdlcData);
    if (Object.keys(OdlcData).length > 0) {
        return (
            <div className='container my-6'>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">UAV</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">ODLC Data</h6>
                        <img src={`${SOCKET_URL}/images/circle_T_${index}.jpg`} alt="" />
                        <div className="card-text">
                            {Object.entries(OdlcData[index]).map(([key, value]) => (
                                <p key={key}>{key}: {value}</p>
                            ))}
                        </div>
                        <div className="buttons d-flex">
                            <button onClick={fetch_last} type="button" disabled={index === 0} className="btn btn-success mx-1">Previous</button>
                            <button onClick={fetch_next} type="button" disabled={index === Object.keys(OdlcData).length - 1} className="btn btn-danger mx-1">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Data;