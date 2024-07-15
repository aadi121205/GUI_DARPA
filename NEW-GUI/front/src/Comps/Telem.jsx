import { SocketState } from "../context/socketContext";
import { TelemState } from "../context/home/telemState";
import Telemexp from "./TelemComps/Teleexp";


export default function Telem() {
    return (
      <SocketState>
        <TelemState>
          <Telemexp />
        </TelemState>
      </SocketState>
                );
    }

