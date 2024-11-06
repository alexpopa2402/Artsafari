import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

const DarkThemeButton = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle dark/light mode">
        {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default DarkThemeButton;