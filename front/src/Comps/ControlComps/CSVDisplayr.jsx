import React, { useState, useEffect } from "react";
const CSVDisplayr = ({ vehicle }) => {
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

  if (!vehicle || !vehicle.locations) {
    return <div>No data available</div>;
  }

  return (
    <div
      style={{
        marginTop: 10,
        marginRight: "35%",
        backgroundColor: "white",
        color: "black",
        padding: "15px",
        borderRadius: 10,
        border: "1px solid green",
        display: "inline-block",
        width: "95%",
        marginLeft: "2%",
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
              height: "100%",
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
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CSVDisplayr;
