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