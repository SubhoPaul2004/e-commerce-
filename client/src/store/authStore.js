import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API from "../api/axios";
import { useCartStore } from './cartStore'; 

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await API.post('/users/login', { email, password });
          set({ user: response.data, loading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            loading: false 
          });
        }
      },

      // SIGNUP ACTION
      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await API.post('/users', { name, email, password });
          set({ user: response.data, loading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Signup failed', 
            loading: false 
          });
        }
      },

      
      logout: () => {
        
        set({ user: null });
        
        
        useCartStore.getState().clearCart();

        
        localStorage.removeItem('user-storage');
        localStorage.removeItem('ecommerce-cart');
      },
    }),
    { name: 'user-storage' }
  )
);