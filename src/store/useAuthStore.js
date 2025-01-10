/* import { create } from 'zustand';
import { supabase } from '@services/supabaseClient';

const useAuthStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,
  error: null,

  fetchAuthData: async () => {
    try {
      set({ loading: true, error: null });
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (session) {
        set({ session, user: session.user });
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

  initializeAuthListener: () => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        set({ session, user: session.user });
        get().fetchAuthData();
      } else {
        set({ session: null, user: null });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  },

  clearAuthData: () => {
    set({ session: null, user: null, loading: false, error: null });
  },
}));

// this is not a good solution but so far it's the only one that I found that doesn't make the conditional rendering of components to flash

useAuthStore.getState().fetchAuthData();
useAuthStore.getState().initializeAuthListener();

export default useAuthStore;
 */
import { create } from 'zustand';
import { supabase } from '@services/supabaseClient';

const useAuthStore = create((set, get) => ({
  session: null,
  user: null,
  profile: null, 
  loading: true,
  error: null,

  fetchAuthData: async () => {
    try {
      set({ loading: true, error: null });
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        set({ session, user: session.user });
        await get().fetchUserProfile(session.user.id); // Fetch profile
      } else {
        set({ session: null, user: null, profile: null });
      }
    } catch (error) {
      console.error('Error fetching auth data:', error);
      set({ session: null, user: null, profile: null, error });
    } finally {
      set({ loading: false });
    }
  },

  fetchUserProfile: async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      set({ profile });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      set({ profile: null, error });
    }
  },

  initializeAuthListener: () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session) {
        set({ session, user: session.user });
        await get().fetchUserProfile(session.user.id); // Fetch profile
      } else {
        set({ session: null, user: null, profile: null });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  },

  clearAuthData: () => {
    set({ session: null, user: null, profile: null, loading: false, error: null });
  },
}));

export default useAuthStore;

