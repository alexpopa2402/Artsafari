import { Navigate, Outlet } from 'react-router-dom';
/* import { useSessionContext } from '@supabase/auth-helpers-react'; */
import { useAuthStore } from 'stores/useAuthStore';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';


const ProtectedRoute = () => {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  // Render the protected component
  return <Outlet />;
};

export default ProtectedRoute;


/* import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from 'stores/useAuthStore';

export default function ProtectedRoute() {
  const user = useAuthStore(state => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
} */