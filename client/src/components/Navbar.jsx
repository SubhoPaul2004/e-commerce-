import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { ShoppingCart, User, Search, Zap, LogOut, ShieldAlert } from 'lucide-react'; // Added ShieldAlert
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  
  const { user, logout } = useAuthStore(); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim()) {
        navigate(`/?search=${searchTerm}`);
      } else {
        navigate(`/`);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tagline = "The all in one store for your tech needs!";

  return (
    <nav className="bg-dark-800/80 backdrop-blur-md border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex flex-col group mt-1 flex-shrink-0">
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ rotate: 180, scale: 1.1 }} transition={{ type: "spring", stiffness: 200 }}>
                <Zap className="text-accent" />
              </motion.div>
              <span className="text-lg md:text-2xl font-bold tracking-wider text-white">
                TECH<span className="text-accent">Bazar</span>
              </span>
            </div>
            
            <div className="hidden md:flex text-[9px] sm:text-[12px] font-extrabold tracking-widest uppercase pl-8 mt-0.5">
              {tagline.split("").map((char, index) => (
                <motion.span 
                  key={index}
                  animate={{
                    y: [0, -3, 0],
                    color: ["#f700fffb", "#5900ff", "#5089f3", "#2f92eec7", "#0b1af7", "#b7b7b8"],
                    textShadow: [
                      "0px 0px 0px rgba(0,0,0,0)",
                      "0px 0px 8px rgba(4, 205, 255, 0.73)",
                      "0px 0px 8px rgba(35, 41, 41, 0.99)",
                      "0px 0px 8px rgba(104, 151, 253, 0.95)",
                      "0px 0px 8px rgb(35, 75, 255)",
                      "0px 0px 0px rgba(0,0,0,0)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.05
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </Link>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-md relative flex items-center">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..." 
              className="w-full bg-dark-900 border border-dark-700 rounded-full py-2 pl-4 pr-10 text-xs sm:text-sm focus:outline-none focus:border-accent text-gray-200 transition-all"
            />
            <Search className="absolute right-3 text-gray-400" size={16} />
          </div>

          {/* ICONS SECTION */}
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            
            {/* ADMIN PANEL LINK - Added this block */}
            {user && user.isAdmin && (
              <Link 
                to="/admin/orders" 
                className="hidden md:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 hover:bg-accent/20 transition-all"
              >
                <ShieldAlert size={16} />
                Admin
              </Link>
            )}

            <Link to="/cart" className="relative group p-1">
              <ShoppingCart className="text-gray-300 group-hover:text-accent transition-colors" size={22} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-2 bg-accent text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-dark-800"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="hidden lg:block text-sm font-medium text-accent">Hi, {user.name}</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gray-300 hover:text-accent transition-colors">
                <User size={22} />
                <span className="hidden sm:block text-sm font-medium">Login</span>
              </Link>
            )}
          </div>
          
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="border-t border-dark-700 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-8 h-10 text-[11px] sm:text-sm font-medium text-gray-400 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/category/smartphones" className="hover:text-accent transition-colors">Smartphones</Link>
            <Link to="/category/laptops" className="hover:text-accent transition-colors">Laptops</Link>
            <Link to="/category/audio" className="hover:text-accent transition-colors">Audio & Headphones</Link>
            <Link to="/category/accessories" className="hover:text-accent transition-colors">Accessories</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;