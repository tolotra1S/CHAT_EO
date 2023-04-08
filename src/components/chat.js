import React, { useState,useEffect } from 'react';
import { addDoc, collection,onSnapshot,serverTimestamp,where,query } from 'firebase/firestore';
import {db,auth} from "../firebaseConfig";

const Chat = (props) => {
    const {room}=props
    const [newMessage,setNewMessage]=useState("");
    const messagesRef = collection(db,"chat")

    useEffect(() => {
        const queryMessages = query(messagesRef,where("room","==",room))
        onSnapshot(queryMessages,(snapshot)=>{
            console.log("NEW MESSAGE");
        });
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newMessage)
        if (newMessage===""){
            return;
        }
       await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
       });
       setNewMessage("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input   placeholder=' Uour message'
                         onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                         />
                <button type='submit'>SEND</button>
            </form>
        </div>
    );
}

export default Chat;
