import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userData, isAdmin } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    // If admin only and user is not admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};
