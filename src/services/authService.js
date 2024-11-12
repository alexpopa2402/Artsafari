import { supabase } from './supabaseClient';

export const fetchSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const fetchUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Listens for changes in authentication state
export const subscribeToAuthChanges = (setSession) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
  return authListener;
};