/* import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
 */

import { Navigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
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