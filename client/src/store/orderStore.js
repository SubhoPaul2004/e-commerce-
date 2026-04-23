import { create } from 'zustand';
import API from "../api/axios";
import { useCartStore } from './cartStore';

export const useOrderStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  createOrder: async (orderData) => {
    set({ loading: true, error: null, success: false });
    try {
      // This hits your /api/orders route
      const response = await API.post('/orders', orderData);
      
      if (response.data) {
        set({ loading: false, success: true });
        // Clear the cart after a successful order
        useCartStore.getState().clearCart(); 
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to place order', 
        loading: false 
      });
    }
  },
  
  resetOrderState: () => set({ success: false, error: null })
}));