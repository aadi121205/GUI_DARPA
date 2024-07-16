import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import VideoBackground from "./HomeComps/Homer";

const Home = () => {
  return (
    <SocketState>
      <TelemState>
        <VideoBackground />
      </TelemState>
    </SocketState>
  );
};

export default Home;
