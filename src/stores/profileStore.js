import { create } from 'zustand';

export const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateProfile: (updatedData) =>
    set((state) => ({ profile: { ...state.profile, ...updatedData } })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

