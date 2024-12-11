// utils/themeUtils.js
export const toggleDarkThemeClass = (isDarkTheme) => {
    document.documentElement.classList.toggle('dark-theme', isDarkTheme);
  };
  
  export const getStoredTheme = () => {
    try {
      return JSON.parse(localStorage.getItem('isDarkTheme'));
    } catch {
      console.warn('Error parsing theme from localStorage');
      return false; // Default to light theme if parsing fails
    }
  };

  export const storeThemePreference = (isDarkTheme) => {
    try {
        const themePreference = JSON.stringify(isDarkTheme);
        localStorage.setItem('isDarkTheme', themePreference);
    } catch {
        console.warn('Error saving theme to localStorage');
    }
  };
  