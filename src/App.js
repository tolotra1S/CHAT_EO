import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth';
import { useState } from 'react';

function App() {
  const [isAuth,SetIsAuth]= useState(cookies.get("auth-token"));
  const [room, SetRoom] = useState(null);

  if(!isAuth){
  return (
    <div className="App">
      Wait. .... ..
      <Auth/>
    </div>
  );
  }
    return (
      <div className="App">
        {room ?( <div>Chat : </div> ):( <div>
        <label>Enter Room Name:</label>
        <input/>
        </div>)}
      </div>
    );
    
  
}

export default App;
