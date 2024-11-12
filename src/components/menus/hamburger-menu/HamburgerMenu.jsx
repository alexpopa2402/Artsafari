import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchSession, subscribeToAuthChanges } from '@services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import AuthButton from "@components/buttons/auth-button/AuthButton";
import { toggleMenu, handleLogout } from '@utils/menuHandlers';
import useScrollLock from '@hooks/useScrollLock';
import "./HamburgerMenu-style.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Initialize authentication
  useEffect(() => {
    const initializeAuth = async () => {
      // Fetch and set the session
      const session = await fetchSession();
      setSession(session);
      // Listens for changes in authentication state
      const authListener = subscribeToAuthChanges(setSession);
      // Cleanup the auth listener
      return () => {
        if (authListener) {
          authListener.unsubscribe();
        }
      };
    };
    initializeAuth();
  }, []);


  // Disable scrolling when popup is open
  useScrollLock(isOpen, false);


  return (
    <div className="hamburger-menu-container" ref={menuRef}>
      <div className="hamburger-icon" onClick={toggleMenu(isOpen, setIsOpen)}>
        <i className="fa fa-bars"></i>
      </div>
      {isOpen && (
        <div className="burger-menu">

          <span className="hamburger-close-popup" onClick={toggleMenu(isOpen, setIsOpen)}>
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
              <a href="/settings/edit-profile" className="burger-settings">
                SETTINGS
              </a>
            )}
            {session ? <a className='burger-logout' onClick={() => {
              handleLogout(setSession, navigate);
              toggleMenu(isOpen, setIsOpen)();
            }}>Log out</a> : <AuthButton />}
          </nav>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;