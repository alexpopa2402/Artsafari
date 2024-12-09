/**
 * Custom hook to lock the body scroll when a menu or authentication modal is open.
 * 
 * @param {boolean} isMenuOpen - Indicates if the menu is open.
 * @param {boolean} isAuthModalOpen - Indicates if the authentication modal is open.
 * @param {boolean} [takeScrollbarWidthIntoAccount=false] - Whether to take the scrollbar width into account.
 */

import { useEffect } from 'react';

const useGlobalScrollLock = (isMenuOpen, isAuthModalOpen, takeScrollbarWidthIntoAccount = false) => {
  useEffect(() => {
    const handleScrollLock = () => {
      if (isMenuOpen || isAuthModalOpen) {
        document.body.classList.add('no-scroll');
        if (takeScrollbarWidthIntoAccount) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      } else {
        document.body.classList.remove('no-scroll');
        if (takeScrollbarWidthIntoAccount) {
          document.body.style.paddingRight = '';
        }
      }
    };

    handleScrollLock();

    return () => {
      document.body.classList.remove('no-scroll');
      if (takeScrollbarWidthIntoAccount) {
        document.body.style.paddingRight = '';
      }
    };
  }, [isMenuOpen, isAuthModalOpen, takeScrollbarWidthIntoAccount]);
};

export default useGlobalScrollLock;


/* import { useEffect } from 'react';

const useGlobalScrollLock = (isMenuOpen, isAuthModalOpen, takeScrollbarWidthIntoAccount = false) => {
  useEffect(() => {
    
    const handleScrollLock = () => {
      if (isMenuOpen || isAuthModalOpen) {
        document.body.classList.add('no-scroll');
        if (takeScrollbarWidthIntoAccount) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      } else {
        document.body.classList.remove('no-scroll');
        if (takeScrollbarWidthIntoAccount) {
          document.body.style.paddingRight = '';
        }
      }
    };

    handleScrollLock();

    return () => {
      document.body.classList.remove('no-scroll');
      if (takeScrollbarWidthIntoAccount) {
        document.body.style.paddingRight = '';
      }
    };
  }, [isMenuOpen, isAuthModalOpen, takeScrollbarWidthIntoAccount]);
};

export default useGlobalScrollLock; */


