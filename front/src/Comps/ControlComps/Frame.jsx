import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Frame = ({ vehicle }) => {
  if (!vehicle) {
    return null;
  }

  if (vehicle.name === "UAV") {
    return (
      <img src="https://www.w3schools.com/images/picture.jpg" alt="UAV" style={{ width: "95%", padding: "5%" }} />
    );
  } else if (vehicle.name === "UGV1") {
    return (
      <img src="https://www.w3schools.com/images/picture.jpg" alt="UAV" style={{ width: "95%", padding: "5%" }} />
    );
  } else if (vehicle.name === "UGV2") {
    return (
      <img src="https://www.w3schools.com/images/picture.jpg" alt="UAV" style={{ width: "95%", padding: "5%" }} />
    );
  } else if (vehicle.name === "UGV3") {
    return (
      <img src="https://www.w3schools.com/images/picture.jpg" alt="UAV" style={{ width: "95%", padding: "5%" }} />
    );
  }

  return null; // Return null if none of the conditions match
};

export default Frame;
