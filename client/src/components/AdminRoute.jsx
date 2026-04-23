import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AdminRoute = ({ children }) => {
  const { user } = useAuthStore();
  
 
  return user && user.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;