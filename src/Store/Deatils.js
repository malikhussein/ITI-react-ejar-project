import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const useProductStore = create((set) => ({
  product: null,
  productList: [],
  processData: null,
  fetchProduct: async (id) => {
    set({ loading: true, err: null }); // ابدأ التحميل وامسح أي خطأ قديم

    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/${id}`
      );
      set({ product: response.data, error: null });
    } catch (error) {
      console.error("Error fetching product:", error);
      set({ product: null, error: "Product not found or server error." });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (updatedData, clearMessage = false) => {
    try {
      const formData = new FormData();

      updatedData.confirmed = false;

      // ✅ فضي رسالة التأكيد لو مطلوب
      if (clearMessage) {
        updatedData.confirmMessage = "";
      }

      // ✅ لو الحالة مش rented، خليه يحولها لـ unavailable
      if (updatedData.status !== "rented") {
        updatedData.status = "unavailable";
      }

      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }

      const response = await axios.post(
        `http://localhost:3000/api/product/${updatedData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product updated", response.data);
    } catch (error) {
      console.error(
        "Error updating product:",
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
      console.error("Error fetching products:", error.message);
    }
  },
  gteProccesOfProduct: async (id, token) => {
    try {
      if (!id) {
        console.warn("ID is undefined, waiting for data...");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/process/getprod/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data?.[0];
      set({ processData: data || null });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      set({ processData: null });
    }
  },
}));

export { useProductStore };
