import { create } from 'zustand';
import axios from 'axios';

const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  success: false, 

  // get all
  fetchCategories: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.get('http://localhost:3000/api/category/');
      set({ 
        categories: response.data.data, 
        success: response.data.success,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
    }
  },

  //add cat
  addCategory: async (newCategory) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        'http://localhost:3000/api/category/', 
        newCategory
      );
      set((state) => ({
        categories: [...state.categories, response.data.data],
        success: response.data.success,
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
      throw error;
    }
  },

 //delete
  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      await axios.delete(`http://localhost:3000/api/category/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== categoryId),
        loading: false,
        success: true
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
    }
  },
}));

export default useCategoryStore;