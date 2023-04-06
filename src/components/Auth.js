import React from 'react';
import {auth,provider} from "../firebaseConfig.js";
import {signInWithPopup} from "firebase/auth";
import Cookies from 'universal-cookie'

const Auth = () => {
    const signInWithGoogle = async () =>{
        const result = await signInWithPopup(auth,provider);
        console.log(result);
    }
    return (
        <div>
            <p>Sign in with google To continue</p>
            <button onClick={signInWithGoogle}>Sign in With Google</button>
        </div>
    );
}

export default Auth;
