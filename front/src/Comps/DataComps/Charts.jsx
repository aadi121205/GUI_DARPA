import React, { useContext } from "react";
import telemContext from "../../context/home/telemContext";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

const renderFrame = (data) => {
  if (data.frame) {
    const src = `data:image/jpeg;base64,${btoa(
      String.fromCharCode(...new Uint8Array(data.frame))
    )}`;
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
          width: "95%",
          borderCollapse: "collapse",
          margin: "30px",
          color: "#f8f8f2",
          background: "#2b2b2b",
          fontSize: "20px",
          lineHeight: "1.5",
        }}
      >
        <tbody>
          {Object.entries(value).map(([subKey, subValue]) => (
            <tr key={subKey}>
              <td style={{ border: "1px solid #555", padding: "6px" }}>
                <b>{subKey}</b>
              </td>
              <td
                style={{
                  border: "1px solid #555",
                  padding: "6px",
                  wordBreak: "break-word",
                }}
              >
                {renderValue(subValue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return String(value);
};

function Length() {
  const { data, data_ugv } = useContext(telemContext);
  console.log(data);
  console.log(data_ugv);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <Row>
        <Col>
          <h2>Data Overview</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#2b2b2b",
              color: "#f8f8f2",
              fontSize: "20px",
              lineHeight: "1.5",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #444", padding: "8px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid #444", padding: "8px" }}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                borderCollapse: "collapse",
                background: "#2b2b2b",
                color: "#f8f8f2",
                fontSize: "20px",
                lineHeight: "2",
              }}
            >
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ border: "1px solid #444", padding: "8px" }}>
                    <b>{key}</b>
                  </td>
                  <td
                    style={{
                      border: "1px solid #444",
                      padding: "8px",
                      wordBreak: "break-word",
                    }}
                  >
                    {renderValue(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col>
          <h2>Data Overview UGV</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#2b2b2b",
              color: "#f8f8f2",
              fontSize: "20px",
              lineHeight: "1.5",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #444", padding: "8px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid #444", padding: "8px" }}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                borderCollapse: "collapse",
                background: "#2b2b2b",
                color: "#f8f8f2",
                fontSize: "20px",
                lineHeight: "2",
              }}
            >
              {Object.entries(data_ugv).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ border: "1px solid #444", padding: "8px" }}>
                    <b>{key}</b>
                  </td>
                  <td
                    style={{
                      border: "1px solid #444",
                      padding: "8px",
                      wordBreak: "break-word",
                    }}
                  >
                    {renderValue(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
}

export default Length;
