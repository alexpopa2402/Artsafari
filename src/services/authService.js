import { supabase } from './supabaseClient';

export const fetchSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession(); // Destructuring assignment to extract 'session' from the response
    if (error) {
      console.error('Error fetching session:', error.message);
      return null;
    }
    return session;
  } catch (err) {
    console.error('Unexpected error fetching session:', err);
    return null;
  }
};

export const fetchUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(); // Destructuring assignment to extract 'user' from the response data
    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
    return user;
  } catch (err) {
    console.error('Unexpected error fetching user:', err);
    return null;
  }
};

/**
 * Listens for changes in authentication state and updates the session state.
 * @param {function} setSession - Function to update the session state in the store.
 */

export const subscribeToAuthChanges = (setSession) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
    setSession(session);
  });
  return () => {
    authListener.subscription.unsubscribe();
  };
};