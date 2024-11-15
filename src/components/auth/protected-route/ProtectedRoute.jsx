import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import PropTypes from 'prop-types';
import Spinner from '@components/loading-spinner/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;