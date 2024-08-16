import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DropdownMenu = ({ vehicles }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].name);

  const handleSelectChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleFunctionClick = (functionName) => {
    const vehicle = vehicles.find(v => v.name === selectedVehicle);
    if (vehicle && vehicle[functionName]) {
      vehicle[functionName](); // Call the specific function
    }
  };

  const renderButtons = () => {
    const vehicle = vehicles.find(v => v.name === selectedVehicle);
    if (vehicle) {
      const functions = [
        { name: 'takeoff', label: 'Takeoff', className: 'btn-primary' },
        { name: 'land', label: 'Land', className: 'btn-secondary' },
        { name: 'arm', label: 'Arm', className: 'btn-success' },
        { name: 'rtl', label: 'Return to Launch', className: 'btn-warning' },
        { name: 'auto', label: 'Auto Mode', className: 'btn-info' },
        { name: 'flymission', label: 'Fly Mission', className: 'btn-danger' },
        { name: 'circle', label: 'Circle Mode', className: 'btn-dark' },
      ];

      return (
        <div className="mt-3">
          {functions.map(func => (
            vehicle[func.name] && (
              <button
                key={func.name}
                className={`btn btn-lg ${func.className} mr-2 mb-2`}
                onClick={() => handleFunctionClick(func.name)}
              >
                {func.label}
              </button>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mt-4">
      <div className="form-group">
        <label htmlFor="vehicleSelect">Select a UAV Vehicle:</label>
        <select id="vehicleSelect" className="form-control" value={selectedVehicle} onChange={handleSelectChange}>
          {vehicles.map((vehicle, index) => (
            <option key={index} value={vehicle.name}>
              {vehicle.name}
            </option>
          ))}
        </select>
      </div>
      
      {renderButtons()}
    </div>
  );
};

export default DropdownMenu;
