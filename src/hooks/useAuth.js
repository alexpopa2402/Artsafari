import { useEffect, useState } from 'react';
import { supabase } from '@services/supabaseClient';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuth;