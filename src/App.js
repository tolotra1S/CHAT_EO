import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth';
import { useState,useRef } from 'react';
import Cookies from 'universal-cookie';
import Chat from './components/chat';
const cookies = new Cookies();

function App() {
  const [isAuth,setIsAuth]= useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
    if(!isAuth){
  return (
    <div className="App">
      Wait. .... ..
      <Auth setIsAuth={setIsAuth}/>
    </div>
  );
  }
    return (
      <div className="App">
        {room ? ( <Chat room={room}/> ) : ( <div>
        <label>Enter Room Name:</label>
        <input ref={roomInputRef}/>
        <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>)}
      </div>
    );
    
  
}

export default App;
