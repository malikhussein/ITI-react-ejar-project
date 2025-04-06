import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function Messages({ chatId, token, userId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.emit('joinChat', chatId);

    axios
      .get(`http://localhost:3000/api/message/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });

    socket.on('recieveMessage', (newMessage) => {
      if (!newMessage.createdAt) {
        newMessage.createdAt = new Date().toLocaleString();
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => socket.off('recieveMessage');
  }, [chatId, token]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        chatId,
        senderId: userId,
        content: message,
      };

      socket.emit('sendMessage', newMessage);

      axios.post('http://localhost:3000/api/message', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('');
    }
  };

  return (
    <div className="w-75 h-100 me-3 d-flex flex-column">
      <div
        className="d-flex flex-column chat-container"
        style={{ overflowY: 'scroll' }}
      >
        {messages.map((msg, index) =>
          msg.senderId === userId ? (
            <div key={index} className="mx-3 align-self-end">
              <h5 className="p-2 bg-primary text-white w-auto rounded-4 text-center">
                {msg.content}
              </h5>
              <p className="small text-muted text-end">
                {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
              </p>
            </div>
          ) : (
            <div key={index} className="mx-3 align-self-start">
              <h5 className="p-2 bg-light w-auto rounded-4 text-center">
                {msg.content}
              </h5>
              <p className="small text-muted">
                {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
              </p>
            </div>
          )
        )}
      </div>
      <div className="d-flex flex-row mt-auto">
        <input
          className="form-control mx-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="Type your message ..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
