import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/product/');
      if (!response.ok) throw new Error('error');
      const result = await response.json();
      set({ products: result.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useProductStore;