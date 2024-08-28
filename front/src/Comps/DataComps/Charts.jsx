import React, { useContext } from "react";
import telemContext from "../../context/home/telemContext";
import "./Charts.css";

const renderFrame = (data) => {
  if (data.frame) {
    const src = `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(data.frame)))}`;
    return <img src={src} alt="UAV Frame" />;
  }
  return <p>No frame data available</p>;
};

const renderValue = (value) => {
  if (typeof value === "object" && value !== null) {
    // Render a sub-table for nested objects or arrays
    return (
      <table
        style={{
          width: "100%",
          margin: "10px 0",
          color: "#f8f8f2",
          fontSize: "13px",
        }}
      >
        <tbody>
          {Object.entries(value).map(([subKey, subValue]) => (
            <tr key={subKey}>
              <td style={{  padding: "6px" }}>{subKey}</td>
              <td style={{  padding: "6px", wordBreak: "break-word" }}>
                {renderValue(subValue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  // For primitive values, simply return the value as a string
  return String(value);
};

function Length() {
  const { data } = useContext(telemContext);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Data Overview</h2>
      <table
        style={{
          width: "40%",
          color: "#f8f8f2",
          lineHeight: "1.5",
        }}
      >
        <thead>
          <tr>
            <th style={{  padding: "8px" }}>Name</th>
            <th style={{  padding: "8px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td style={{  padding: "8px" }}>{key}</td>
              <td style={{  padding: "8px", wordBreak: "break-word" }}>
                {renderValue(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Length;
