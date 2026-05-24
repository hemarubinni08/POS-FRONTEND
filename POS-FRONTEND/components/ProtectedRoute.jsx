import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole, allowedRoles }) => {
  const token = localStorage.getItem('token');

  const userRoles = JSON.parse(
    localStorage.getItem('userRoles') || '[]'
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const allowed = allowedRoles || (allowedRole ? [allowedRole] : null);

  if (
    allowed &&
    !allowed.some(role => userRoles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;