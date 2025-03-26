import axios from 'axios';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useProductStore = create((set, get) => ({
  userProducts: [],
  error: null,
  loading: false,
  postProduct: async (token, productData) => {
    try {
      set({ loading: true, error: null });
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      productData.append('renterId', userId);
      const response = await axios.post(
        `http://localhost:3000/api/product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
  getUserProducts: async (token, userId) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`http://localhost:3000/api/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allProducts = response?.data?.data;
      const userProducts = allProducts.filter(
        (product) => product.renterId._id === userId
      );
      set({ userProducts, loading: false });

      console.log(allProducts);
      console.log(userProducts);
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    }
  },
}));

export default useProductStore;
