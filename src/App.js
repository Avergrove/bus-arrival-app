import './App.css';
import { BusStation } from './BusStation/BusStation';

import { FaGithub } from 'react-icons/fa'

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <header><div>BUS ARRIVAL APP</div></header>
        
        <div className='main'><BusStation className='main'></BusStation></div>
        
        <footer>
          <div>Bus Arrival App is a project made using React Native, with bus information provided by the API from Land Transport Authority</div>
          <div></div>
          <div><FaGithub/> Github URL</div>
        </footer>
      </div>
    </div>
  );
}



export default App;