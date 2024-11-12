// src/services/menuHandlers.js
import { supabase } from '@services/supabaseClient';

export const handleClickOutside = (menuRef, setIsOpen) => (event) => {
  if (menuRef.current && !menuRef.current.contains(event.target)) {
    setIsOpen(false);
  }
};

export const toggleMenu = (isOpen, setIsOpen) => () => {
  setIsOpen(!isOpen);
};

export const handleLogout = async (setSession, navigate) => {
  await supabase.auth.signOut();
  setSession(null);
  navigate('/');
};