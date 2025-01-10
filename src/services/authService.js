/* import { supabase } from './supabaseClient';

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
}; */

/* export const subscribeToAuthChanges = (setSession) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
    setSession(session);
  });
  return () => {
    authListener.subscription.unsubscribe(); // Unsubscribe from the auth listener
  };
}; */