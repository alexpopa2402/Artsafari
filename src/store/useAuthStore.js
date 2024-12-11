import {create} from 'zustand';
import { fetchSession, fetchUser } from '@services/authService';
import { supabase } from '@services/supabaseClient';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  fetchAuthData: async () => {
    set({ loading: true });
    const session = await fetchSession();
    if (session) {
      const user = await fetchUser();
      set({ user, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export default useAuthStore;