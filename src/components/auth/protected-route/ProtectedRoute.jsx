import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;