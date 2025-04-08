import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useChatStore from '../../Store/chatStore';

export default function ChatSidebar({ chatId, token, userId }) {
  const { chatLoading, userChats, getUserChats } = useChatStore();

  useEffect(() => {
    getUserChats(token);
  }, [getUserChats, token]);

  if (chatLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div
      className="h-100 border-end"
      style={{ overflowY: 'scroll', width: '375px' }}
    >
      {userChats.map((chat) => (
        <Link to={`/chat/${chat._id}`} key={chat._id} className="nav-link">
          <div
            key={chat._id}
            className={`d-flex flex-row border-bottom align-items-center m-2 rounded ${
              chat._id === chatId ? 'bg-light' : ''
            }`}
          >
            {chat.members.map(
              (member) =>
                member._id !== userId && (
                  <>
                    <img
                      className="rounded-circle p-2"
                      src={member.profilePicture}
                      alt="User Picture"
                      width={80}
                      height={80}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                    <h4 className="mt-2" key={member._id}>
                      {member.userName}
                    </h4>
                  </>
                )
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
