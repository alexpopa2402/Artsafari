import { useEffect } from 'react';

const useCloseOnResize = (isOpen, setIsOpen, breakpoint) => {
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const handleMediaChange = (e) => {
      if (e.matches && isOpen) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [isOpen, setIsOpen, breakpoint]);
};

export default useCloseOnResize;

/* import { useEffect } from 'react';

const useCloseOnResize = (isOpen, setIsOpen, breakpoint) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > breakpoint && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, setIsOpen, breakpoint]);
};

export default useCloseOnResize; */