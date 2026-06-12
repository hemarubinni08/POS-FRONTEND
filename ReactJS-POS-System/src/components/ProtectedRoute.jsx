import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
console.log("token", token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;