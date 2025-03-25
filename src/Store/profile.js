import axios from 'axios';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useProfileStore = create((set, get) => ({
  profile: null,
  currentUserId: null,
  loading: false,
  errorStatus: null,
  fetchProfile: async (userId, token) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ profile: response.data.user, loading: false });
    } catch (error) {
      set({ errorStatus: error.response?.status || error.message, loading: false });
    }
  },
  setCurrentUser: (userId) => set({ currentUserId: userId }),
  isEditable: (token) => {
    const { profile } = get();
    if (!token || !profile) return false;
    try {
      const decoded = jwtDecode(token);
      const currentUserId = decoded?.id;
      return profile._id === currentUserId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  },
  updateProfile: async (userId, token, updatedData) => {
    try {
      set({ loading: true, error: null });
      console.log(updatedData)
      const response = await axios.put(`http://localhost:3000/api/user/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      set({ profile: response.data.user, loading: false });
    } catch (error) {
      console.log(error);
      set({ errorStatus: error.response?.status || error.message, loading: false });
    }
  },
}));

export default useProfileStore;
