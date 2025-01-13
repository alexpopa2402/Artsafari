/* import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import { useUser, useSession } from '@supabase/auth-helpers-react';


const ProtectedRoute = () => {
  const user = useUser();
  const session = useSession();
  const loading = session === undefined;

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute; */


import { Navigate, Outlet } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';


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
