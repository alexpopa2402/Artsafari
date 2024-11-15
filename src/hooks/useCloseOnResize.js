import { useEffect } from 'react';

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

export default useCloseOnResize;