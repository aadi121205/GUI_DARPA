import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Cameraexp from "./CameraComps/Cameraexp";

const Camera = () => {
  return (
    <SocketState>
      <TelemState>
        <Cameraexp />
      </TelemState>
    </SocketState>
  );
};

export default Camera;
