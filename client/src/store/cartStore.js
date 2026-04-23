import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item._id === product._id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map((item) => 
              item._id === product._id ? { ...item, qty: item.qty + 1 } : item
            )
          });
        } else {
          set({ cartItems: [...cartItems, { ...product, qty: 1 }] });
        }
      },

      removeFromCart: (productId) => 
        set((state) => ({ 
          cartItems: state.cartItems.filter(item => item._id !== productId) 
        })),

      updateQuantity: (productId, qty) =>
        set((state) => ({
          cartItems: state.cartItems.map(item => 
            item._id === productId ? { ...item, qty: Math.max(1, qty) } : item
          )
        })),

      
      clearCart: () => set({ cartItems: [] }),
      

      getTotalPrice: () => 
        get().cartItems.reduce((total, item) => total + item.price * item.qty, 0),
        
      getCartCount: () => 
        get().cartItems.reduce((total, item) => total + item.qty, 0),
    }),
    {
      name: 'ecommerce-cart', 
    }
  )
);