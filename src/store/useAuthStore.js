import { create } from 'zustand';
import { fetchSession, fetchUser, subscribeToAuthChanges } from '@services/authService'

const useAuthStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,
  error: null,

  fetchAuthData: async () => { //Fetch authentication session and user data
    try {
      set({ loading: true, error: null });
      const session = await fetchSession();
      if (session) {
        const user = await fetchUser();
        set({ session, user });
      } else {
        set({ session: null, user: null });
      }
    } catch (error) {
      console.error('Error fetching auth data:', error);
      set({ session: null, user: null, error });
    } finally {
      set({ loading: false });
    }
  },

  initializeAuthListener: () => { // Initialize and listen for authentication changes
    const cleanup = subscribeToAuthChanges((newSession) => {
      if (newSession) {
        set({ session: newSession });
        get().fetchAuthData(); // Refresh user data if there's a new session
      } else {
        set({ session: null, user: null });
      }
    });
    // Return a cleanup function to unsubscribe from auth changes
    return cleanup;
  },
  //Clear all authentication data from the store
  clearAuthData: () => {
    set({ session: null, user: null, loading: false, error: null });
  },
}));

export default useAuthStore;

/* import { create } from "zustand";
import { supabase } from '@services/supabaseClient';

const useAuthStore = create((set, get) => ({
  session: null,
  profile: null,
  loading: false,
  error: null,

  // Fetch session and profile data
  fetchAuthData: async () => {
    set({ loading: true, error: null });

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (session) {
        const userId = session.user.id;

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;

        set({ session, profile });
      } else {
        set({ session: null, profile: null });
      }
    } catch (error) {
      console.error("Error fetching auth data:", error);
      set({ session: null, profile: null, error });
    } finally {
      set({ loading: false });
    }
  },

  // Initialize authentication state listener
  initializeAuthListener: () => {
    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        set({ session });
        get().fetchAuthData(); // Fetch profile on session change
      } else {
        set({ session: null, profile: null });
      }
    });

    // Cleanup function to unsubscribe
    return () => authListener.unsubscribe();
  },

  // Clear authentication state
  clearAuthData: () => {
    set({ session: null, profile: null, loading: false, error: null });
  },
}));

export default useAuthStore; */
