import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowNarrowUp } from "react-icons/hi";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { width } from "@mui/system";

const CSVDisplay = ({ vehicle }) => {
  // Ensure vehicle and vehicle.locations are defined
  const [data, setData] = useState(vehicle?.locations || []);
  const [editing, setEditing] = useState(null);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    if (!modified && vehicle && vehicle.locations) {
      // Refresh data when the vehicle changes and no modifications are ongoing
      setData(vehicle.locations || []);
    }
  }, [vehicle, modified]);

  const handleEdit = (rowIndex, colIndex, value) => {
    const updatedData = [...data];

    // Convert the value to a float before updating
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
      updatedData[rowIndex][colIndex] = floatValue;
    } else {
      updatedData[rowIndex][colIndex] = value; // If the value cannot be converted to a float, keep the original value
    }

    setData(updatedData);
    setModified(true); // Mark as modified

    if (vehicle && vehicle.uploadMission) {
      vehicle.uploadMission(updatedData); // Call uploadMission with updated data
      console.log("success"); // Print success
    }
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
    setModified(true); // Mark as modified
    if (vehicle && vehicle.uploadMission) {
      vehicle.uploadMission(updatedData); // Call uploadMission with updated data
      console.log("success"); // Print success
    }
  };

  const handleMoveRowUp = (rowIndex) => {
    if (rowIndex > 0) {
      const updatedData = [...data];
      const temp = updatedData[rowIndex - 1];
      updatedData[rowIndex - 1] = updatedData[rowIndex];
      updatedData[rowIndex] = temp;
      setData(updatedData);
      setModified(true); // Mark as modified
      if (vehicle && vehicle.uploadMission) {
        vehicle.uploadMission(updatedData); // Call uploadMission with updated data
        console.log("success"); // Print success
      }
    }
  };

  const handleMoveRowDown = (rowIndex) => {
    if (rowIndex < data.length - 1) {
      const updatedData = [...data];
      const temp = updatedData[rowIndex + 1];
      updatedData[rowIndex + 1] = updatedData[rowIndex];
      updatedData[rowIndex] = temp;
      setData(updatedData);
      setModified(true); // Mark as modified
      if (vehicle && vehicle.uploadMission) {
        vehicle.uploadMission(updatedData); // Call uploadMission with updated data
        console.log("success"); // Print success
      }
    }
  };

  const handleDoubleClick = (rowIndex, colIndex) => {
    setEditing({ rowIndex, colIndex });
  };

  const handleBlur = () => {
    setEditing(null);
  };

  const handleChange = (e, rowIndex, colIndex) => {
    handleEdit(rowIndex, colIndex, e.target.value);
  };

  if (!vehicle || !vehicle.locations) {
    return <div>No data available</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "15px",
        borderRadius: 10,
        border: "1px solid green",
        display: "inline-block",
        width: "95%",
        overflow: "auto",
        margin: "auto",
      }}
    >
      <h3>Way Points Display</h3>
      <br />
      {data.length > 0 && (
        <>
          <table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <tbody style={{ backgroundColor: "white" }}>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      style={{
                        padding: 15,
                        border: "1px solid black", // Adding borders to each cell
                        fontSize: 25,
                      }}
                      key={colIndex}
                      onDoubleClick={() =>
                        handleDoubleClick(rowIndex, colIndex)
                      }
                    >
                      {editing &&
                      editing.rowIndex === rowIndex &&
                      editing.colIndex === colIndex ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleChange(e, rowIndex, colIndex)}
                          onBlur={handleBlur}
                          autoFocus
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                  <td
                    style={{
                      border: "1px solid black", // Adding borders to each cell
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => handleMoveRowUp(rowIndex)}
                      style={{ margin: "auto" }}
                    >
                      <HiArrowNarrowUp fontSize={30} />
                    </Button>
                  </td>
                  <td
                    style={{
                      border: "1px solid black", // Adding borders to each cell
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => handleMoveRowDown(rowIndex)}
                      style={{ margin: "auto" }}
                    >
                      <HiArrowDown fontSize={30} />
                    </Button>
                  </td>
                  <td
                    style={{
                      border: "1px solid black", // Adding borders to each cell
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => handleDeleteRow(rowIndex)}
                      style={{ margin: "auto" }}
                    >
                      <HiArchiveBoxXMark fontSize={30} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CSVDisplay;
