import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useChatStore from '../../Store/chatStore';

const socket = io('http://localhost:3000');

export default function Messages({ chatId, token, userId }) {
  const [otherMember, setOtherMember] = useState(null);
  const [message, setMessage] = useState('');
  const {
    chatMessages,
    getChatMessages,
    setChatMessages,
    postMessage,
    getChatById,
  } = useChatStore();

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
    const fetchChatData = async () => {
      try {
        const chat = await getChatById(chatId, token);
        if (chat && chat.members) {
          const other = chat.members.find((member) => member._id !== userId);
          setOtherMember(other);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };

    fetchChatData();
  }, [getChatById, chatId, token, userId]);

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
    <div className="w-100 h-100 me-3 d-flex flex-column">
      {otherMember ? (
        <div className="border-bottom d-flex d-lg-none flex-row justify-content-center align-items-center">
          <img
            className="rounded-circle p-2"
            src={
              'https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg'
            }
            alt="User Picture"
            width={80}
          />
          <h4 className="mt-2">{otherMember.userName}</h4>
        </div>
      ) : (
        <h4 className="text-center">Loading...</h4>
      )}
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
              </h5>{' '}
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
