import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Custom hook to scroll the window to the top whenever the pathname changes

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
};

export default useScrollToTop;