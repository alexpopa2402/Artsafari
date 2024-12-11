import useThemeStore from '@store/useThemeStore';
import { Around } from '@theme-toggles/react';
import '@theme-toggles/react/css/Around.css';
import './DarkThemeButton-style.css';

const DarkThemeButton = () => {
  // Read the current theme state from Zustand store
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className="theme-toggle-container">
      <Around
        toggled={isDarkTheme}
        toggle={toggleTheme}
        duration={500}
        aria-label="Toggle dark/light mode"
      />
    </div>
  );
};

export default DarkThemeButton;