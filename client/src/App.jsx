import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Category from './pages/Category';
import AdminOrders from './pages/AdminOrders'; 
import { useAuthStore } from './store/authStore'; 

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- SAFE ADMIN ROUTE ---
const AdminRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  
  // Optional: If you have a 'loading' state in authStore, use it here.
  // For now, we use a safe optional chaining check.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* The 'key' on Routes is important for Framer Motion transitions 
          */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/product/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
            <Route path="/category/:categoryName" element={<PageWrapper><Category /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            
            <Route 
              path="/admin/orders" 
              element={
                <AdminRoute>
                  <PageWrapper>
                    <AdminOrders />
                  </PageWrapper>
                </AdminRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;