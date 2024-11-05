/* import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@services/supabaseClient';

const useAuth = () => {
  const [user, setUser] = useState(null); // Initialize user state to null
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession(); // Fetch the current session
      if (session) {
        const { data: { user: fetchedUser } } = await supabase.auth.getUser(); // Fetch the user data if session exists
        setUser(fetchedUser); // Set the user data in state
      } else {
        navigate('/'); // Navigate to home page if no session exists
      }
    };

    fetchUser(); // Call the fetchUser function
  }, [navigate]); // Dependency array includes navigate

  return user; // Return the user state
};

export default useAuth; */

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