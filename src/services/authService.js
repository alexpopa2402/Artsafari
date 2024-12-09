import { supabase } from './supabaseClient';

export const fetchSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();   // Destructuring assignment to extract 'session' from the response
  return session;
};

export const fetchUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();   // Destructuring assignment to extract 'user' from the response data
  return user;
};

/**
 * Listens for changes in authentication state
 * @param {function} setSession - Function to update the session state
 */

export const subscribeToAuthChanges = (setSession) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
    setSession(session);
  });
  return authListener;
};