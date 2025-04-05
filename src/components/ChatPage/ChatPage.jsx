import React from 'react';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import Messages from '../Messages/Messages';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../Store/Auth';
import { jwtDecode } from 'jwt-decode';

export default function ChatPage() {
  const { token } = useAuthStore();
  const userId = jwtDecode(token).id;

  const { chatId } = useParams();
  return (
    <div>
      <h2 className="w-100 p-4">Your messages</h2>
      <div className="d-flex flex-row" style={{ height: '80vh' }}>
        <ChatSidebar chatId={chatId} token={token} userId={userId} />
        {chatId ? (
          <Messages chatId={chatId} token={token} userId={userId} />
        ) : (
          <div className="w-75 h-100 me-3 d-flex flex-column">
            <div className="d-flex flex-column" style={{ overflowY: 'scroll' }}>
              <h2 className="text-center">Select a chat to start messaging</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
