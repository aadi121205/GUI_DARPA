import React, { useContext } from "react";
import telemContext from "../../context/home/telemContext";

const renderFrame = (data) => {
  if (data.frame) {
    const src = `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(data.frame)))}`;
    return <img src={src} alt="UAV Frame" />;
  }
  return <p>No frame data available</p>;
};

function Length() {
  const { data } = useContext(telemContext);

  return (
    <div style={{ padding: "20px", display: "flex" }}>
      <div style={{ flex: 1, color: "white" }}>
        <h2>Time</h2>
        <p>Time of the rover</p>
        <p>Time: {new Date(data.time * 1000).toLocaleString()}</p>
{/*         {renderFrame(data)}
 */}      </div>
    </div>
  );
}

export default Length;
