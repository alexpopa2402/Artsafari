import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@services/supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes } from '@fortawesome/free-solid-svg-icons';
import AuthButton from "@components/auth/auth-button/AuthButton";
import "./HamburgerMenu-style.css";

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
/*   useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]); */

  // Disable scrolling when popup is open and add padding to body to account for scrollbar 
  
  useEffect(() => {
    const handleScrollLock = () => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.classList.add('no-scroll');
        } else {
            document.body.style.paddingRight = '';
            document.body.classList.remove('no-scroll');
        }
    };

    handleScrollLock();
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
            {session ? <a className='burger-logout' onClick={handleLogout}>Log out</a> : <AuthButton />}
          </nav>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;