import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowNarrowUp } from "react-icons/hi";
import { HiArchiveBoxXMark } from "react-icons/hi2";

const CSVDisplay = ({ vehicle }) => {
  const [data, setData] = useState(vehicle?.locations || []);
  const [editing, setEditing] = useState(null);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    if (!modified && vehicle && vehicle.locations) {
      setData(vehicle.locations || []);
    }
  }, [vehicle, modified]);

  const handleEdit = (rowIndex, colIndex, value) => {
    const updatedData = [...data];
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
      updatedData[rowIndex][colIndex] = floatValue;
    } else {
      updatedData[rowIndex][colIndex] = value;
    }
    setData(updatedData);
    setModified(true);
    if (vehicle && vehicle.uploadMission) {
      vehicle.uploadMission(updatedData);
      console.log("success");
    }
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
    setModified(true);
    if (vehicle && vehicle.uploadMission) {
      vehicle.uploadMission(updatedData);
      console.log("success");
    }
  };

  const handleMoveRowUp = (rowIndex) => {
    if (rowIndex > 0) {
      const updatedData = [...data];
      const temp = updatedData[rowIndex - 1];
      updatedData[rowIndex - 1] = updatedData[rowIndex];
      updatedData[rowIndex] = temp;
      setData(updatedData);
      setModified(true);
      if (vehicle && vehicle.uploadMission) {
        vehicle.uploadMission(updatedData);
        console.log("success");
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
      setModified(true);
      if (vehicle && vehicle.uploadMission) {
        vehicle.uploadMission(updatedData);
        console.log("success");
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

  const handleAddNewLine = () => {
    const newRow = ["", ""]; // Add as many empty elements as there are columns in your table
    const updatedData = [...data, newRow];
    setData(updatedData);
    setModified(true);
    if (vehicle && vehicle.uploadMission) {
      vehicle.uploadMission(updatedData);
      console.log("New row added");
    }
  };

  if (!vehicle || !vehicle.locations) {
    return <div>No data available</div>;
  }

  return (
    <div
      style={{
        color: "black",
        padding: "15px",
        borderRadius: 10,
        border: "1px solid green",
        display: "inline-block",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <h3>Way Points Display</h3>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewLine}
        style={{ marginBottom: "10px" }}
      >
        Add New Line
      </Button>
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
                        border: "1px solid black",
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
                        <textarea
                          value={cell}
                          onChange={(e) =>
                            handleChange(e, rowIndex, colIndex)
                          }
                          onBlur={handleBlur}
                          autoFocus
                          style={{
                            width: "100%",
                            fontSize: "inherit",
                            padding: "5px",
                            boxSizing: "border-box",
                          }}
                          rows={2}
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                  <td style={{ border: "1px solid black" }}>
                    <Button
                      variant="primary"
                      onClick={() => handleMoveRowUp(rowIndex)}
                      style={{ margin: "auto" }}
                    >
                      <HiArrowNarrowUp fontSize={30} />
                    </Button>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <Button
                      variant="primary"
                      onClick={() => handleMoveRowDown(rowIndex)}
                      style={{ margin: "auto" }}
                    >
                      <HiArrowDown fontSize={30} />
                    </Button>
                  </td>
                  <td style={{ border: "1px solid black" }}>
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
