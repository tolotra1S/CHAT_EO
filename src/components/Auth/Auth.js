import React, { useState, useEffect } from 'react';
import { auth, provider } from "../../Firebase/firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie';
import "./auth.css"

const cookies = new Cookies();

const Auth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = cookies.get('auth-token');
    if (authToken) {
      auth.signInWithCustomToken(authToken)
        .then((result) => {
          setUser(result.user);
          setIsAuth(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsAuth(true);
      cookies.set('auth-token', await result.user.getIdToken(), { path: '/', maxAge: 86400 * 7 });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

 

  return (
    <div>
     
        <div>
        <a onClick={signInWithGoogle}>
        <div class="g-sign-in-button">
          <div class="content-wrapper">
            <div class="logo-wrapper">
              <img src="https://developers.google.com/identity/images/g-logo.png"/>
            </div>
            <span class="text-container">
              <span>Sign in with Google</span>
            </span>
          </div>
        </div>
      </a>
          
        </div>
    </div>
  );
};

export default Auth;
