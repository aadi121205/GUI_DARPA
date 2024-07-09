import React, { useContext } from 'react'
import telemContext from '../../context/home/telemContext';

const Telem = () => {

    const { telemetryData, start_Telem, stop_Telem,mode } = useContext(telemContext);

    return (
        <div className='container my-6'>
            <div className="card" style={{ width: "18rem" }}>
                <button className={`btn btn-${mode} top-right-button`}></button>
                <div className="card-body">
                    <h5 className="card-title">UAV</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Telemetery</h6>
                    <div className="card-text">
                        <p>Latitude: {telemetryData.latitude}</p>
                        <p>Longitude: {telemetryData.longitude}</p>
                        <p>Altitude: {telemetryData.altitude}</p>
                        <p>AirSpeed: {telemetryData.airspeed}</p>
                        <p>GroundSpeed: {telemetryData.groundspeed}</p>
                        <p>Mode: {telemetryData.mode}</p>
                    </div>
                    <div className="buttons d-flex">
                        <button onClick={start_Telem} type="button" className="btn btn-success mx-1">Start Telemetry</button>
                        <button onClick={stop_Telem} type="button" className="btn btn-danger mx-1">Stop telemetry</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Telem;
