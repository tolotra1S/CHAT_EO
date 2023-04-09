import React, { useState, useEffect } from 'react';
import { auth, provider } from "../firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie';

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
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setIsAuth(false);
      cookies.remove('auth-token', { path: '/' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isAuth ? (
        <div>
          <p>Welcome {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>Sign in with Google to continue</p>
          <button onClick={signInWithGoogle}>Sign in With Google</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
