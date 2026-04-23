import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore'; // 1. Import Auth Store
import { Link, useNavigate } from 'react-router-dom'; // 2. Import useNavigate
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion'; // 3. Import Framer Motion

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const { user } = useAuthStore(); // 4. Get User state
  const navigate = useNavigate();

  // 5. Checkout Protection Logic
  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-6 border border-dark-700">
          <Trash2 size={40} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6">Looks like you haven't added any tech yet.</p>
        <Link to="/" className="bg-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-white">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex flex-col sm:flex-row items-center gap-4">
              <img src={item.images[0]?.url} alt={item.name} className="w-24 h-24 object-cover rounded-md bg-dark-900" />
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                <p className="text-gray-400 text-sm">{item.category}</p>
                <div className="text-accent font-bold mt-1">${item.price}</div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-dark-900 rounded-lg p-1 border border-dark-700">
                <button 
                  onClick={() => updateQuantity(item._id, Math.max(1, item.qty - 1))}
                  className="p-1 hover:text-accent transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium text-white">{item.qty}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.qty + 1)}
                  className="p-1 hover:text-accent transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors ml-2"
                aria-label="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6 border-b border-dark-700 pb-4 text-white">Order Summary</h2>
          
          <div className="space-y-3 text-gray-300 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          
          <div className="flex justify-between text-xl font-bold text-white border-t border-dark-700 pt-4 mb-6">
            <span>Total</span>
            <span className="text-accent">${getTotalPrice().toFixed(2)}</span>
          </div>

          {/* 6. Button with Logic and Framer Motion */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout} 
            className="w-full bg-accent hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-accent/20"
          >
            Proceed to Checkout
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          {!user && (
            <p className="text-[10px] text-gray-500 text-center mt-3 uppercase tracking-tighter">
              You will need to login to complete your order
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;