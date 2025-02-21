import { Navigate, Outlet } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import Spinner from '@components/loaders/spinners/globalSpinner/Spinner';


const ProtectedRoute = () => {
  const { isLoading, session } = useSessionContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (!session) {
    return <Navigate to="/" />;
  }

  // Render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
