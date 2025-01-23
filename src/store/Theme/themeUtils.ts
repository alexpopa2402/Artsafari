

// Toggle the dark-theme class on the document element
export const toggleDarkThemeClass = (isDarkTheme: boolean): void => {
  document.documentElement.classList.toggle('dark-theme', isDarkTheme);
};

// Check if the code is running in the browser or not (SSR) to prevent errors
const isBrowser = typeof window !== 'undefined';

export const getStoredTheme = (): boolean | null => {
  if (!isBrowser) return null; // Prevent SSR issues
  try {
    const storedTheme = localStorage.getItem('isDarkTheme');
    return storedTheme ? JSON.parse(storedTheme) : null;
  } catch {
    console.warn('Error parsing theme from localStorage');
    return null;
  }
};

// Save the theme preference to localStorage
export const storeThemePreference = (isDarkTheme: boolean): void => {
  try {
    const themePreference = JSON.stringify(isDarkTheme);
    localStorage.setItem('isDarkTheme', themePreference);
  } catch {
    console.warn('Error saving theme to localStorage');
  }
};

// Add an event listener to synchronize the theme when localStorage is updated so theme stays in sync across tabs
export const syncThemeAcrossTabs = (setTheme: (isDarkTheme: boolean) => void): void => {
  if (typeof window === 'undefined') return;
  window.addEventListener('storage', (event) => {
    if (event.key === 'isDarkTheme') {
      const newTheme = event.newValue ? JSON.parse(event.newValue) : false;
      setTheme(newTheme);
      toggleDarkThemeClass(newTheme);
    }
  });
};