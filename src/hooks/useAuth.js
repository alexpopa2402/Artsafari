import { useEffect, useState } from 'react';
import { fetchSession, fetchUser } from '@services/authService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      const session = await fetchSession();
      if (session) {
        const user = await fetchUser();
        setUser(user);
      }
      setLoading(false);
    };

    fetchAuthData();
  }, []);

  return { user, loading };
};

export default useAuth;

/* import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth; */