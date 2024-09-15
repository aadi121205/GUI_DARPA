import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import CSVDisplay from "./CSVDisplayCon";
import CSVDisplayr from "./CSVDisplayr";

const MainComponent = ({ vehicles }) => {
  const handleFunctionClick = (vehicle, functionName) => {
    console.log(`Function ${functionName} clicked for vehicle`, vehicle);
    // Add your function handling logic here
  };
  const CSV = ({ vehicle }) => {
    if (!vehicle) {
      return null;
    }

    if (vehicle.name === "UAV") {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <CSVDisplayr vehicle={vehicle} />
        </div>
      );
    }
    return (
      <div>
        {renderButtons(vehicle)}
        <CSVDisplay vehicle={vehicle} />
      </div>
    );
  };
  const renderButtons = (vehicle) => {
    if (!vehicle) {
      return null;
    }

    const functions = [
      { name: "takeoff", label: "Takeoff", className: "btn-primary" },
      { name: "land", label: "Land", className: "btn-secondary" },
      { name: "arm", label: "Arm", className: "btn-danger" },
      { name: "rtl", label: "Return to Launch", className: "btn-warning" },
      { name: "auto", label: "Auto Mode", className: "btn-info" },
      { name: "flymission", label: "Fly Mission", className: "btn-success" },
      {
        name: "uploadMission",
        label: "Upload Mission",
        className: "btn-light",
      },
    ];

    return (
      <div className="mt-3" style={{ padding: 15 }}>
        {functions.map(
          (func) =>
            vehicle[func.name] && (
              <button
                style={{
                  margin: "15px",
                  overflow: "hidden",
                  backgroundColor: "black",
                  color: "white",
                }}
                key={func.name}
                className={`btn btn-lg ${func.className} mr-2 mb-2`}
                onClick={() => handleFunctionClick(vehicle, func.name)}
              >
                {func.label}
              </button>
            )
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "80px" }}>Vehicle Control</h1>
      <Row>
        {vehicles.slice(0, 2).map((vehicle, index) => (
          <Col key={index} style={{ padding: "15px" }}>
            <h2 style={{ textAlign: "center", fontSize: "40px" }}>
              {vehicle.name}
            </h2>
            <CSV vehicle={vehicle} />
          </Col>
        ))}
      </Row>
      <Row>
        {vehicles.slice(2, 4).map((vehicle, index) => (
          <Col key={index} style={{ padding: "15px" }}>
            <h2 style={{ textAlign: "center", fontSize: "40px" }}>
              {vehicle.name}
            </h2>
            <CSV vehicle={vehicle} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainComponent;
