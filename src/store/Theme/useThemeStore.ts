import { create } from 'zustand';
import { toggleDarkThemeClass, getStoredTheme, storeThemePreference, syncThemeAcrossTabs } from '@store/Theme/themeUtils';

interface ThemeState {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => {
  const storedTheme = getStoredTheme() || false; // Default to light theme
  toggleDarkThemeClass(storedTheme); // Ensure DOM matches initial theme
  syncThemeAcrossTabs((isDarkTheme) => set({ isDarkTheme }));

  return {
    isDarkTheme: storedTheme,
    toggleTheme: () => set((state) => {
      const newTheme = !state.isDarkTheme;
      toggleDarkThemeClass(newTheme);
      storeThemePreference(newTheme);
      return { isDarkTheme: newTheme };
    }),
  };
});

export default useThemeStore;