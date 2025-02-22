import "./App.css";
import { TelemState } from "./Context/Home/telemState";
import { SocketState } from "./Context/SocketContext";
import One from "./Comps/One";
function App() {
  return (
    <SocketState>
      <TelemState>
        <div className="App">

          <One />
        </div>
      </TelemState>
    </SocketState>
  );
}

export default App;
