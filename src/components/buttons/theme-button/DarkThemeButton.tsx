import useThemeStore from 'stores/Theme/useThemeStore'
import { Around } from '@theme-toggles/react';
import '@theme-toggles/react/css/Around.css';
import './DarkThemeButton-style.css';

const DarkThemeButton: React.FC = () => {
  // Read the current theme state from Zustand store
  const isDarkTheme = useThemeStore((state: { isDarkTheme: boolean }) => state.isDarkTheme);
  const toggleTheme = useThemeStore((state: { toggleTheme: () => void }) => state.toggleTheme);

  return (
    <div className="theme-toggle-container">
      <Around
        toggled={isDarkTheme}
        toggle={toggleTheme}
        placeholder="Toggle theme"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        duration={500}
        aria-label="Toggle dark/light mode"
      />
    </div>
  );
};
console.log('Rendering DarkThemeButton component');
export default DarkThemeButton;