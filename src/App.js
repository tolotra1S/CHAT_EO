import logo from './images/logo.png';
import logout from './images/logout.png';
import './App.css';
import Auth from './components/Auth/Auth';
import { useState,useRef } from 'react';
import Cookies from 'universal-cookie';
import Chat from './components/Chat/chat';
import {signOut} from 'firebase/auth';
import {auth} from "./Firebase/firebaseConfig";
const cookies = new Cookies();

function App() {
  const [isAuth,setIsAuth]= useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () =>{
    await signOut(auth);
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }
    if(!isAuth){
  return (
    <div className="App">
      <div className="logo">
          <img src={logo} className='imgLogo'/>
      </div>
      <div className='authent'>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    </div>
  );
  }
    return (
      <div className="">
      <button onClick={signUserOut} className='logout'><img src={logout}/></button>
        
        <div>
        {room ? ( <Chat room={room}/> ) : ( 
            <div className='Secret'>
              <div className="logos">
                <img src={logo} className='imgLogos'/>
              </div>
              <input ref={roomInputRef} type='password' placeholder='Entrer votre Code TChat'/>
              
              <button onClick={()=> setRoom(roomInputRef.current.value)} className='btn'>Enter >>></button>
            <div/>
        </div>
        )}
      </div>
      </div>
    );
    
  
}

export default App;
