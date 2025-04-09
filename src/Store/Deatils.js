import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useProductStore = create((set) => ({
  product: null,
  productList: [],
  fetchProduct: async (id) => {
    set({ loading: true, err: null }); // ابدأ التحميل وامسح أي خطأ قديم

    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/${id}`
      );
      set({ product: response.data, error: null });
    } catch (error) {
      console.error('Error fetching product:', error);
      set({ product: null, error: 'Product not found or server error.' });
    } finally {
      set({ loading: false });
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
      toast.success(`Product updated successfully`);
    } catch (error) {
      console.error(
        'Error updating product:',
        error.response?.data || error.message
      );
      toast.error('Failed to update product');
    }
  },
  getAllProd: async (id) => {
    try {
      if (!id) {
        console.warn('ID is undefined, waiting for data...');
        return;
      }

      const categoryId = typeof id === 'object' && id !== null ? id._id : id;

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
