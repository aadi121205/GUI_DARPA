import viteLogo from '/drone.svg'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <Link to="/telem" className="card">
      <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
    </div>
  )
}
export default Home