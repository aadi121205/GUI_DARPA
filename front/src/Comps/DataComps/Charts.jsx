import React, { useContext } from "react";
import telemContext from "../../context/home/telemContext";

// Generate a color based on the depth level
const getColorByDepth = (depth) => {
  const colors = [
    "#2b2b2b", // Level 0
    "#3b3b3b", // Level 1
    "#4b4b4b", // Level 2
    "#5b5b5b", // Level 3
    "#6b6b6b", // Level 4
    // Add more colors if you expect deeper nesting
  ];
  return colors[depth % colors.length];
};

const renderValue = (value, depth = 0) => {
  if (typeof value === "object" && value !== null) {
    // Render a sub-table for nested objects or arrays
    return (
      <table
        style={{
          width: "100%",
          margin: "10px 0",
          background: getColorByDepth(depth),
          color: "#f8f8f2",
          fontSize: "13px",
          lineHeight: "2.5",
          borderRadius: "20px",
        }}
      >
        <tbody>
          {Object.entries(value).map(([subKey, subValue]) => (
            <tr key={subKey}>
              <td style={{ padding: "6px" }}>{subKey}</td>
              <td style={{ padding: "6px", wordBreak: "break-word" }}>
                {renderValue(subValue, depth + 1)}
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
          background: "#2b2b2b",
          color: "#f8f8f2",
          fontSize: "14px",
          lineHeight: "2.5",
          textAlign: "center",
          borderRadius: "40px",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "8px" }}>Name</th>
            <th style={{ padding: "8px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td style={{ padding: "8px" }}>{key}</td>
              <td style={{ padding: "8px", wordBreak: "break-word" }}>
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
