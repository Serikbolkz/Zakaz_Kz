import { Navigate } from 'react-router-dom';

const PublicRoute = ({ user, children }) => {
  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;