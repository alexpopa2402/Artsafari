// src/services/menuHandlers.js

export const handleClickOutside = (menuRef, setIsOpen) => (event) => {
  if (menuRef.current && !menuRef.current.contains(event.target)) {
    setIsOpen(false);
  }
};