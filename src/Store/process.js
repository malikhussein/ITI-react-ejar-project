import axios from 'axios';
import { create } from 'zustand';

const useProcessStore = create((set, get) => ({
  userProcesses: [],
  error: null,
  loading: false,
  getProcesses: async (token) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(
        `http://localhost:3000/api/process/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const processes = response?.data;
      set({ userProcesses: processes, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  postProcess: async (productId, processData, token) => {
    try {
      set({ loading: true, error: null });
      await axios.post(
        `http://localhost:3000/api/process/${productId}`,
        processData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  acceptProcess: async (processId, token) => {
    try {
      set({ loading: true, error: null });
      await axios.put(
        `http://localhost:3000/api/process/${processId}`,
        { status: 'in progress' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  declineProcess: async (processId, token) => {
    try {
      set({ loading: true, error: null });
      await axios.put(
        `http://localhost:3000/api/process/${processId}`,
        { status: 'canceled' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
}));

export default useProcessStore;
