import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // <--- 1. Import Framer Motion

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = (e) => {
    e.preventDefault(); // Prevents the link from triggering when clicking the button
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: { background: '#333', color: '#fff' }
    });
  };

  return (
    // 2. Change standard div to motion.div and add physics properties
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-accent/20 transition-all duration-300 group border border-dark-700 flex flex-col"
    >
      <Link to={`/product/${product._id}`} className="block relative h-48 overflow-hidden bg-dark-900">
        <img 
          src={product.images[0]?.url || '/placeholder.png'} 
          alt={product.name} 
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-accent uppercase tracking-wider mb-1 font-semibold">
          {product.category}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-100 hover:text-accent transition-colors truncate mb-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex justify-between items-center pt-4">
          <span className="text-xl font-bold text-white">${product.price}</span>
          
          {/* 3. Change button to motion.button and add hover/tap gestures */}
          <motion.button 
            onClick={handleAdd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            className="p-2 bg-accent hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;