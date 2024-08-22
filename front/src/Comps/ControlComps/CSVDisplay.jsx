import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const CSVDisplay = () => {
  const [data, setData] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [editing, setEditing] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Store the file name
      setFileSelected(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        Papa.parse(text, {
          header: false, // Set to false because there are no headers
          complete: (result) => {
            setData(result.data);
          },
        });
      };
      reader.readAsText(file);
    }
  };

  const handleEdit = (rowIndex, colIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][colIndex] = value;
    setData(updatedData);
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

  const handleDeleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  const handleMoveRowUp = (rowIndex) => {
    if (rowIndex > 0) {
      const updatedData = [...data];
      const temp = updatedData[rowIndex - 1];
      updatedData[rowIndex - 1] = updatedData[rowIndex];
      updatedData[rowIndex] = temp;
      setData(updatedData);
    }
  };

  const handleMoveRowDown = (rowIndex) => {
    if (rowIndex < data.length - 1) {
      const updatedData = [...data];
      const temp = updatedData[rowIndex + 1];
      updatedData[rowIndex + 1] = updatedData[rowIndex];
      updatedData[rowIndex] = temp;
      setData(updatedData);
    }
  };

  const saveToFile = (updatedData) => {
    const csv = Papa.unparse(updatedData, {
      header: false,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName); // Use the original file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto-save whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      saveToFile(data);
    }
  }, [data]);

  return (
    <div
      style={{
        margin: 35,
        backgroundColor: "white",
        color: "black",
        padding: 15,
      }}
    >
      <h4>Way Points Display</h4>
      {!fileSelected && (
        <input type="file" accept=".txt, .csv" onChange={handleFileChange} />
      )}
      {data.length > 0 && (
        <>
          <table
            style={{ borderCollapse: "collapse", border: "1px solid black" }}
          >
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      style={{
                        padding: 5,
                        border: "1px solid black", // Adding borders to each cell
                      }}
                      key={colIndex}
                      onDoubleClick={() => handleDoubleClick(rowIndex, colIndex)}
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
                  <td>
                    <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                    <button onClick={() => handleMoveRowUp(rowIndex)}>Up</button>
                    <button onClick={() => handleMoveRowDown(rowIndex)}>Down</button>
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
