import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import CSVDisplay from "./CSVDisplay";
import CSVDisplayr from "./CSVDisplayr";
import Frame from "./Frame";

const CSV = ({ vehicle }) => {
  if (!vehicle) {
    return null;
  }
  if (vehicle.name === "UAV") {
    return <CSVDisplay vehicle={vehicle} />;
  } else {
    return <CSVDisplayr vehicle={vehicle} />;
  }
};
const DropdownMenu = ({ vehicles }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].name);

  const handleSelectChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleFunctionClick = (functionName) => {
    const vehicle = vehicles.find((v) => v.name === selectedVehicle);
    if (vehicle && vehicle[functionName]) {
      vehicle[functionName](); // Call the specific function
    }
  };

  const renderButtons = () => {
    const vehicle = vehicles.find((v) => v.name === selectedVehicle);
    if (vehicle) {
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
        <div className="mt-3" style={{ padding: 5 }}>
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
                  onClick={() => handleFunctionClick(func.name)}
                >
                  {func.label}
                </button>
              )
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: 15 }}>
      <div style={{ textAlign: "center" }}>
        <label
          htmlFor="vehicleSelect"
          style={{ fontSize: 30, padding: 5, margin: "auto" }}
        >
          Vehicle Controls
        </label>
        <select
          id="vehicleSelect"
          className="form-control"
          value={selectedVehicle}
          onChange={handleSelectChange}
          style={{
            width: "97%",
            margin: "auto",
            display: "block",
            padding: "15px",
            marginTop: "15px",
            overflow: "hidden",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          {vehicles.map((vehicle, index) => (
            <option
              key={index}
              value={vehicle.name}
              style={{
                backgroundColor:
                  selectedVehicle === vehicle.name ? "#007bff" : "#fff",
                color: selectedVehicle === vehicle.name ? "#fff" : "#000",
                fontWeight:
                  selectedVehicle === vehicle.name ? "bold" : "normal",
                textAlign: "center",
                fontSize: "20px",
                padding: "10px",
              }}
            >
              {vehicle.name}
            </option>
          ))}
        </select>
      </div>
      <Row style={{ margin: 10 }}>
        <Col>
          {renderButtons()}
          <CSV vehicle={vehicles.find((v) => v.name === selectedVehicle)} />
        </Col>
        <Col>
          <Frame vehicle={vehicles.find((v) => v.name === selectedVehicle)} />
        </Col>
      </Row>
    </div>
  );
};

export default DropdownMenu;
