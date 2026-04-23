import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { CreditCard, MapPin, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, getTotalPrice } = useCartStore();
  const { createOrder, loading, success, error, resetOrderState } = useOrderStore();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    if (success) {
      toast.success('Order placed successfully!', { 
        duration: 5000,
        icon: '🎉',
        style: { background: '#333', color: '#fff' } 
      });
      resetOrderState();
      navigate('/');
    }

    if (error) {
      toast.error(error, { style: { background: '#333', color: '#fff' } });
    }
  }, [success, error, navigate, resetOrderState]);

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    // PREVENT PAGE REFRESH (This is likely why it wasn't working before)
    e.preventDefault(); 
    
    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        image: item.images[0]?.url || '',
        price: item.price,
        product: item._id 
      })),
      shippingAddress: {
        // These will now correctly pass the string/number combos from your state
        address: String(shippingData.address), 
        city: String(shippingData.city),
        postalCode: String(shippingData.postalCode),
        country: String(shippingData.country),
      }, 
      totalPrice: getTotalPrice(),
    };

    console.log("SENDING TO BACKEND:", orderData);
    await createOrder(orderData);
  };

  if (cartItems.length === 0 && !success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Your cart is empty</h2>
        <Link to="/" className="text-accent hover:underline">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6">
        <ArrowLeft size={20} />
        <span>Back to Cart</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* LEFT: Shipping & Payment */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-800 p-6 md:p-8 rounded-2xl border border-dark-700"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-dark-700 pb-4">
              <MapPin className="text-accent" /> Shipping Details
            </h2>
            
            {/* Form now handles the submit event */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input 
                  required type="text" name="fullName" value={shippingData.fullName} onChange={handleChange}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent text-gray-200"
                  placeholder="John Doe 123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                <input 
                  required type="text" name="address" value={shippingData.address} onChange={handleChange}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent text-gray-200"
                  placeholder="123 Tech Street, Apt 4B"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                  <input 
                    required type="text" name="city" value={shippingData.city} onChange={handleChange}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent text-gray-200"
                    placeholder="Silicon Valley"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Postal Code</label>
                  <input 
                    required type="text" name="postalCode" value={shippingData.postalCode} onChange={handleChange}
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent text-gray-200"
                    placeholder="94025"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                <input 
                  required type="text" name="country" value={shippingData.country} onChange={handleChange}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent text-gray-200"
                  placeholder="United States"
                />
              </div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800 p-6 md:p-8 rounded-2xl border border-dark-700"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-b border-dark-700 pb-4">
              <CreditCard className="text-accent" /> Payment Method
            </h2>
            <div className="bg-dark-900 border-2 border-accent rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-accent rounded-full"></div>
                <span className="font-medium text-white">Cash on Delivery / Mock Payment</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 p-6 md:p-8 rounded-2xl border border-dark-700 sticky top-24"
          >
            <h2 className="text-xl font-bold mb-6 border-b border-dark-700 pb-4 text-white">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.images[0]?.url} alt={item.name} className="w-12 h-12 object-cover rounded bg-dark-900" />
                    <div className="overflow-hidden">
                      <h4 className="text-sm font-medium text-gray-200 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-white">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-gray-300 mb-6 border-t border-dark-700 pt-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white border-t border-dark-700 pt-4 mt-2">
                <span>Total</span>
                <span className="text-accent">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full bg-accent hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  <CheckCircle size={22} />
                  Place Order
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;