import { Container, Button, Row, Col, Card } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import telemContext from "../../context/home/telemContext";

const renderFrame = (data, frame) => {
  if (frame) {
    return (
      <div style={{ width: "100%", height: "100%" , alignContent: "center", justifyContent: "center", display: "flex", padding: 35}}>
        <img
          src={frame}
          alt="UAV Frame"
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
          backgroundColor: "black",
          color: "white",
          alignSelf: "center",
        }}
      >

        <Row style={{ paddingTop: "15px" }}>
          <Col>
            <h2 style={{ textAlign: "center" }}>UAV</h2>
            {renderFrame(data, frame_uav)}
          </Col>
          <Col>
            <h2 style={{ textAlign: "center" }}>UGV1</h2>
            {renderFrame(data_ugv, frame_ugv)}
          </Col>
        </Row>
        <Row style={{ paddingTop: "35px" }}>
          <Col>
            <h2 style={{ textAlign: "center" }}>UGV2</h2>
            {renderFrame(data_ugv, frame_ugv2)}
          </Col>
          <Col>
            <h2 style={{ textAlign: "center" }}>UGV3</h2>
            {renderFrame(data_ugv, frame_ugv3)}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Cameraexp;
