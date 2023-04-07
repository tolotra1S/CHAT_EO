import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {db} from "../firebaseConfig";

const Chat = () => {
    const [newMessage,setNewMessage]=useState("");
    const messagesRef = collection(db,"messages")
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newMessage)
        if (newMessage===""){
            return;
        }
       await addDoc(messagesRef, )
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input   placeholder=' Uour message'
                         onChange={(e) => setNewMessage(e.target.value)}/>
                <button type='submit'>SEND</button>
            </form>
        </div>
    );
}

export default Chat;
