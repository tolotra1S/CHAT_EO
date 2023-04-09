import React, { useState,useEffect } from 'react';
import { addDoc, collection,onSnapshot,serverTimestamp,where,query, orderBy } from 'firebase/firestore';
import {db,auth} from "../../Firebase/firebaseConfig";

const Chat = (props) => {
    const {room}=props
    const [newMessage,setNewMessage]=useState("");
    const [messages,setMessages]=useState([]);
    
    const messagesRef = collection(db,"chat")

    useEffect(() => {
        const queryMessages = query(
            messagesRef,
            where("room","==",room),
            orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMessages,(snapshot)=>{
            let messages = [];
            console.log("NEW MESSAGE");
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id})
            });
            setMessages(messages);

        });
        return () => unsuscribe();
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
        <div>
            <h1>{room}</h1>
        </div>
        <div>
        {messages.map((message)=>(
            <p>{message.text} - {message.user} </p>
            
        ))}
        </div>
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
