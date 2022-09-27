import './App.css';
import { BusStation } from './BusStation/BusStation';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaGithub } from 'react-icons/fa'

function App() {
  return (
    <div className='App'>
      <div className='main-container'>
        <header><div>BUS ARRIVAL APP</div></header>
        
        <div className='main'><BusStation className='main'></BusStation></div>
        
        <footer>
          <div>Bus Arrival App is a project made using ReactJS, with bus information provided by the API from Land Transport Authority</div>
          <div></div>
          <div><a href='https://github.com/Avergrove/bus-arrival-app'><FaGithub/> Github</a></div>
        </footer>
      </div>
    </div>
  );
}



export default App;