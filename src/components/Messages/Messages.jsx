import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useChatStore from '../../Store/chatStore';

const socket = io('http://localhost:3000');

export default function Messages({ chatId, token, userId }) {
  const [message, setMessage] = useState('');
  const { chatMessages, getChatMessages, setChatMessages, postMessage } =
    useChatStore();

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    socket.emit('joinChat', chatId);

    getChatMessages(chatId, token);

    socket.on('recieveMessage', (newMessage) => {
      if (!newMessage.createdAt) {
        newMessage.createdAt = new Date().toLocaleString();
      }
      setChatMessages(newMessage);
    });
    return () => socket.off('recieveMessage');
  }, [setChatMessages, getChatMessages, chatId, token]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        chatId,
        senderId: userId,
        content: message,
      };

      socket.emit('sendMessage', newMessage);

      postMessage(newMessage, token);

      setMessage('');
    }
  };

  return (
    <div className="w-75 h-100 me-3 d-flex flex-column">
      <div
        className="d-flex flex-column chat-container"
        style={{ overflowY: 'scroll' }}
      >
        {chatMessages.map((msg, index) =>
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
