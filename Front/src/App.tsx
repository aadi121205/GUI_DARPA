import viteLogo from '/drone.svg'
import './App.css'
import { SocketState } from './context/SocketContext'
import { TelemState } from './context/home/TelemState'

function App() {

  return (
    <>
        <SocketState>
      <TelemState>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

      </div>
      </TelemState>
      </SocketState>
    </>
  )
}

export default App
