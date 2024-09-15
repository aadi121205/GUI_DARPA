import { Container, Button, Row, Col, Card } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import telemContext from "../../context/home/telemContext";

const renderFrame = (data, frame) => {
  if (frame) {
    return (
      <div>
        <img
          src={frame}
          alt="UAV Frame"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
    );
  }
  return <p>No frame data available</p>;
};

function Cameraexp() {
  const { data, data_ugv } = useContext(telemContext); // Assuming you have a setData function to update the context
  const [frame_uav, setFrame] = useState(null);
  const [frame_ugv, setFrameUgv] = useState(null);
  const [frame_ugv2, setFrameUgv2] = useState(null);
  const [frame_ugv3, setFrameUgv3] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // For uploaded image
  // Handle UAV frame data
  useEffect(() => {
    if (data.uav_frame) {
      const blob = new Blob([new Uint8Array(data.uav_frame)], {
        type: "image/jpeg",
      });
      const src = URL.createObjectURL(blob);
      setFrame(src);

      return () => URL.revokeObjectURL(src);
    }
  }, [data.uav_frame]);
  useEffect(() => {
    if (data_ugv.ugv1_frame) {
      const blob = new Blob([new Uint8Array(data_ugv.ugv1_frame)], {
        type: "image/jpeg",
      });
      const src = URL.createObjectURL(blob);
      setFrameUgv(src);

      return () => URL.revokeObjectURL(src);
    }
  }, [data_ugv.ugv1_frame]);
  useEffect(() => {
    if (data_ugv.ugv2_frame) {
      const blob = new Blob([new Uint8Array(data_ugv.ugv2_frame)], {
        type: "image/jpeg",
      });
      const src = URL.createObjectURL(blob);
      setFrameUgv2(src);

      return () => URL.revokeObjectURL(src);
    }
  }, [data_ugv.ugv2_frame]);
  useEffect(() => {
    if (data_ugv.ugv3_frame) {
      const blob = new Blob([new Uint8Array(data_ugv.ugv3_frame)], {
        type: "image/jpeg",
      });
      const src = URL.createObjectURL(blob);
      setFrameUgv3(src);

      return () => URL.revokeObjectURL(src);
    }
  }, [data_ugv.ugv3_frame]);
  return (
    <>
      <div
        style={{
          padding: "15px",
          overflow: "hidden",
          backgroundColor: "black",
          color: "white",
          alignSelf: "center",
        }}
      >
        <h1>Image Display</h1>

        <Row>
          <Col><h3>UAV</h3>{renderFrame(data, frame_uav)}</Col>
          <Col><h3>UGV1</h3>{renderFrame(data_ugv, frame_ugv)}</Col>
        </Row>
        <Row>
          <Col><h3>UGV2</h3>{renderFrame(data_ugv, frame_ugv2)}</Col>
          <Col><h3>UGV3</h3>{renderFrame(data_ugv, frame_ugv3)}</Col>
        </Row>
      </div>
    </>
  );
}

export default Cameraexp;
