import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import VideoBackground from "./HomeComps/Homer";
import Charts from "./DataComps/Charts";

const Data = () => {

  return (
    <SocketState>
      <TelemState>
        <Charts />
        </TelemState>
    </SocketState>
  );
};

export default Data;
