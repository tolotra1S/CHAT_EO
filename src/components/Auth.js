import React from 'react';
import {auth,provider} from "../firebaseConfig.js";
import {signInWithPopup} from "firebase/auth";
import Cookies from 'universal-cookie';
const cookies = new Cookies;

const Auth = () => {
    const signInWithGoogle = async () =>{
        try {
        const result = await signInWithPopup(auth,provider);
        console.log(result);
        cookies.set("auth-token",result.user.refreshToken);
        }
        catch(err){
            console.error(err)

        }
    }
    return (
        <div>
            <p>Sign in with google To continue</p>
            <button onClick={signInWithGoogle}>Sign in With Google</button>
        </div>
    );
}

export default Auth;
