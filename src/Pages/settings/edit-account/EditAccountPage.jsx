import {useState, useEffect} from 'react';

const EditAccountPage = () => {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };
  return (
    <div>
      <h2>Edit Account</h2>
        {<button onClick={toggleTheme} className="theme-toggle-button">
          {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
        </button>}
    </div>
  );
};

export default EditAccountPage;