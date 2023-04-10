import React, { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, where, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../Firebase/firebaseConfig';
import './chat.css';
import logo from "../../images/logo.png"

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [limit, setLimit] = useState(4);

  const messagesRef = collection(db, 'chat');

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setChatMessages(messages);
    });
    return () => unsuscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === '') {
      return;
    }
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage('');
  };

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 4);
  };

  return (
    <div>
      <div className='room'>
      <img src={logo} className='logoChat'/>
        <h2>Vous êtes dans la Discussion : {room}</h2>
      </div>
      {chatMessages.length > limit && (
          <div className="chatbox-show-more">
            <a onClick={handleShowMore}>Voir plus</a>
          </div>
        )}
      <div>
        {chatMessages.slice(-limit).map((message) => (
          <div key={message.id}>
            <div className="chatbox-message-item received">
              <span className="chatbox-message-item-text">
                {message.user} - {message.text}
              </span>
              <span className="chatbox-message-item-time">
              {message.createdAt?.toDate().toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        
        <div className="chatbox-message-bottom">
          <form onSubmit={handleSubmit} className="chatbox-message-form">
            <textarea
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              placeholder="Type message..."
              className="chatbox-message-input"
            ></textarea>
            <button type="submit" className="chatbox-message-submit">
              <i className="bx bx-send"></i>SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
