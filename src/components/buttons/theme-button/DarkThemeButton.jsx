/* import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import './DarkThemeButton-style.css';

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

export default DarkThemeButton; */

/* import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Around } from '@theme-toggles/react';
import '@theme-toggles/react/css/Around.css';
import './DarkThemeButton-style.css';

const DarkThemeButton = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [isToggled, setToggle] = useState(isDarkTheme);

  useEffect(() => {
    setToggle(isDarkTheme);
  }, [isDarkTheme]);

  const handleToggle = () => {
    setToggle(!isToggled);
    toggleTheme();
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={handleToggle}
    >
      <Around toggled={isToggled} duration={750} />
    </button>
  );
};

export default DarkThemeButton; */

import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Around } from '@theme-toggles/react';
import '@theme-toggles/react/css/Around.css';
import './DarkThemeButton-style.css';

const DarkThemeButton = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

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