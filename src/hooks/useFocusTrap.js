import { useEffect } from 'react';

const useFocusTrap = (ref, active) => {
  useEffect(() => {
    if (!active) return;
    const handleFocusTrap = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = ref.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => {
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [ref, active]);  
};

export default useFocusTrap;