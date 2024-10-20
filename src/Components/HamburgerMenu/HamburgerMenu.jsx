import { useState, useEffect, useRef } from "react";
import "./hamburgerMenu-style.css";
import LoginRegisterButton from "../Login/LoginRegisterButton/LoginRegisterButton";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Client/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes } from '@fortawesome/free-solid-svg-icons';

const HamburgerMenu = () => {
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  // Toggle the popup
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the popup when clicking outside of it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Disable scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate('/');
  };
  // Fetch session and set it to state
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
      return () => {
        authListener.unsubscribe();
      };
    };

    fetchSession();
  }, []);
  
  return (
    <div className="hamburger-menu-container" ref={menuRef}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>
      {isOpen && (
        <div className="burger-menu">

          <span className="hamburger-close-popup" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <nav className="burger-nav-links">
            <a href="/" className="burger-Home">
              HOME
            </a>
            <a href="/gallery" className="burger-gallery">
              GALLERY
            </a>
            <a href="/artists" className="burger-artists">
              ARTISTS
            </a>
            <a href="/about" className="burger-about">
              ABOUT US
            </a>
          </nav>
          <div className="divider"></div>
          <nav className="burger-nav-links">
            {session && (
              <a href="/settings" className="burger-settings">
                SETTINGS
              </a>
            )} 
            {session ? <a className='burger-logout' onClick={handleLogout}>Log out</a> : <LoginRegisterButton />}
          </nav>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;