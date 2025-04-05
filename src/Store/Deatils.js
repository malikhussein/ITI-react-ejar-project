import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
  product: null,
  productList: [],
  fetchProduct: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/${id}`
      );

      set({ product: response.data });
      
    } catch (error) {
      console.error('Error fetching product:', error);
    }
    
  },

  updateProduct: async (updatedData) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/product/${updatedData._id}`,
        updatedData
      );

      set((state) => ({
        product: {
          ...state.product,
          data: {
            ...state.product.data,
            ...updatedData,
          },
        },
      }));
    } catch (error) {
      console.error(
        'Error updating product:',
        error.response?.data || error.message
      );
    }
  },
  getAllProd: async (id) => {
    try {


      if (!id) {
        console.warn("ID is undefined, waiting for data...");
        return;
      }

      const categoryId = typeof id === "object" && id !== null ? id._id : id;

        
        const response = await axios.get(
          `http://localhost:3000/api/product/?category=${categoryId.toString()}`
        );
  
        set({ productList: response.data.data });
      

   
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  },
}));

export { useProductStore };
