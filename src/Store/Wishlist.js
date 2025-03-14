import { create } from "zustand"; // Import Zustand for state management

//  Zustand store for Wishlist
const useWishlistStore = create((set) => ({
  
  // Initialize wishlist from local storage (or empty array if not found)
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],

  //Keep track of the number of items in the wishlist
  count: JSON.parse(localStorage.getItem("wishlist"))?.length || 0,

  //  Add a product to the wishlist (if it's not already in the list)
  addToWishlist: (product) => set((state) => {
    if (!state.wishlist.some((p) => p.id === product.id)) { // Check if product is already in wishlist
      const updatedWishlist = [...state.wishlist, product]; // Add new product
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to local storage
      return { wishlist: updatedWishlist, count: updatedWishlist.length }; // Update state
    }
    return state; // Return same state if product already exists
  }),

  //  Remove a product from the wishlist by ID
  removeFromWishlist: (productId) => set((state) => {
    const updatedWishlist = state.wishlist.filter((product) => product.id !== productId); // Remove product
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save updated wishlist
    return { wishlist: updatedWishlist, count: updatedWishlist.length }; // Update state
  }),

  //  Clear all products from the wishlist
  clearWishlist: () => set(() => {
    localStorage.removeItem("wishlist"); // Remove wishlist from local storage
    return { wishlist: [], count: 0 }; // Reset wishlist and count in state
  }),

  //  Check if a specific product is in the wishlist
  isWishlisted: (productId) => (state) => {
    return state.wishlist.some((product) => product.id === productId); // Return true if product exists
  }
}));

export default useWishlistStore; // Export store for use in components
