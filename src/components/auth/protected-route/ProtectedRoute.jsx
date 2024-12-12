import { Navigate } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';
import PropTypes from 'prop-types';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

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