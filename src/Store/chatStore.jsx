import axios from 'axios';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useChatStore = create((set, get) => ({
  userChats: [],
  chatMessages: [],
  error: null,
  loading: false,
  createChat: async (receiverId, token) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `http://localhost:3000/api/chat`,
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const chat = response?.data;
      return chat;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  getChatById: async (chatId, token) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(
        `http://localhost:3000/api/chat/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const chat = response?.data;
      return chat;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  getUserChats: async (token) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`http://localhost:3000/api/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const chats = response?.data;
      set({ userChats: chats, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  postMessage: async (message, token) => {
    try {
      set({ loading: true, error: null });
      await axios.post(`http://localhost:3000/api/message`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  getChatMessages: async (chatId, token) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(
        `http://localhost:3000/api/message/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const messages = response?.data;
      set({ chatMessages: messages, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  setChatMessages: (newMessage) => {
    set((prevState) => ({
      chatMessages: [...prevState.chatMessages, newMessage],
    }));
  },
}));

export default useChatStore;
