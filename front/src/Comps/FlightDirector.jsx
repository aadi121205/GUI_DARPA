import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import ImageDisplay from "./FDComps/Imgdown";

const FD = () => {
  return (
    <SocketState>
      <TelemState>
        <ImageDisplay />
      </TelemState>
    </SocketState>
  );
};

export default FD;
