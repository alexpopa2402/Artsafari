import { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '@hooks/useLocalStorage';
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage ('isDarkTheme',false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', isDarkTheme);
    localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeContext, ThemeProvider };