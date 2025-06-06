import { Button } from "@mui/material";
import { Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={`/src/assets/swarm.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content" style={{ alignItems: "center" }}>
        <h1 style={{ fontSize: "90px", textAlign: "center" }}>
          Welcome to UAS's GUI
        </h1>
        <br />
        <h3>
          Here you can find all the information about the UAS's telemetry and
          data <br /> pls switch to full screen
        </h3>
        <br />
        <Row
          style={{
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Col>
            <br />
            <a href="/telem">
              <Button onClick={() => {}} variant="contained">
                Go to Telemetry (UAV)
              </Button>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
