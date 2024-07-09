import React, { useContext } from 'react'
import telemContext from '../../context/home/telemContext'

const Command = () => {

  const { flyUav, armUav, disarmUav, setGimbalPoint, roll, pitch, yaw, setyaw, setroll, setpitch ,downloadMission,readMission,saveMission,uploadMission} = useContext(telemContext);

  return (
    <div>
      <button onClick={armUav} type="button" className="btn btn-success mx-1">Arm UAV </button>
      <button onClick={flyUav} type="button" className="btn btn-success mx-1">Fly UAV - TAKEOFF</button>
      <button onClick={disarmUav} type="button" className="btn btn-success mx-1">Disarm UAV</button>
      <button onClick={downloadMission} type="button" className="btn btn-primary mx-1">Download Mission</button>
      <button onClick={readMission} type="button" className="btn btn-primary mx-1">Read Mission</button>
      <button onClick={uploadMission} type="button" className="btn btn-primary mx-1">Upload Mission</button>
      <button onClick={saveMission} type="button" className="btn btn-primary mx-1">Save Mission</button>

      <div className="gimbal">
        <input type="number" id="roll" placeholder='roll' value={roll} onChange={(e) => setroll(e.target.value)} />
        <input type="number" id="pitch" placeholder='pitch' value={pitch} onChange={(e) => setpitch(e.target.value)} />
        <input type="number" id="yaw" placeholder='yaw' value={yaw} onChange={(e) => setyaw(e.target.value)} />
        <button className="btn btn-primary" onClick={setGimbalPoint}>Set Gimbal Point</button>
      </div>

    </div>
  )
}

export default Command