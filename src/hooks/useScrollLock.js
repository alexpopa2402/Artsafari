// src/hooks/useScrollLock.js
import { useEffect } from 'react';

const useScrollLock = (isOpen, takeScrollbarWidthIntoAccount = false) => {
  useEffect(() => {
    if (isOpen) {
      if (takeScrollbarWidthIntoAccount) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.classList.add('no-scroll');
    } else {
      document.body.style.paddingRight = '';
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen, takeScrollbarWidthIntoAccount]);
};

export default useScrollLock;