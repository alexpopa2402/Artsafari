import { create } from 'zustand';
import { toggleDarkThemeClass, getStoredTheme, storeThemePreference } from '@utils/themeUtils';

const useThemeStore = create((set) => ({
  isDarkTheme: getStoredTheme() || false, // Default to light theme
  toggleTheme: () => set((state) => {
    const newTheme = !state.isDarkTheme;
    toggleDarkThemeClass(newTheme);
    storeThemePreference(newTheme);
    return { isDarkTheme: newTheme };
  }),
}));

export default useThemeStore;