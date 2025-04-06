import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ChatSidebar({ chatId, token, userId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/chat', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setChats(res.data);
      })
      .catch((error) => {
        console.error('Error fetching chats:', error);
      });
  }, [token]);

  return (
    // Make it responsive
    <div className="w-25 h-100 border-end" style={{ overflowY: 'scroll' }}>
      {chats.map((chat) => (
        <Link to={`/chat/${chat._id}`} key={chat._id} className="nav-link">
          <div
            key={chat._id}
            className={`d-flex flex-row align-items-center m-2 rounded ${
              chat._id === chatId ? 'bg-light' : ''
            }`}
          >
            <img
              className="rounded-circle p-2"
              src={
                'https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg'
              }
              alt="User Picture"
              width={80}
            />
            {chat.members.map(
              (member) =>
                member._id !== userId && (
                  <h4 className="mt-2" key={member._id}>
                    {member.userName}
                  </h4>
                )
            )}
          </div>
        </Link>
      ))}
      <div className="d-flex flex-row align-items-center m-2 rounded">
        <img
          className="rounded-circle p-2"
          src={
            'https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg'
          }
          alt="User Picture"
          width={80}
        />
        <h4 className="mt-2">Hamza</h4>
      </div>
      <div className="d-flex flex-row align-items-center m-2 rounded">
        <img
          className="rounded-circle p-2"
          src={
            'https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg'
          }
          alt="User Picture"
          width={80}
        />
        <h4 className="mt-2">Ahmed</h4>
      </div>
    </div>
  );
}
