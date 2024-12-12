/* import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchSession, subscribeToAuthChanges } from '@services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import AuthButton from "@components/buttons/auth-button/AuthButton";
import { toggleMenu } from '@utils/menuHandlers';
import { handleLogout } from '@utils/authHandlers';
import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import useCloseOnResize from '@hooks/useCloseOnResize';
import useFocusTrap from '@hooks/useFocusTrap';
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

  // Close hamburger menu on window resize above 1000px
  useCloseOnResize(isOpen, setIsOpen, 1000);

  // Disable scrolling when popup is open
  useGlobalScrollLock(isOpen, false);

  // Trap focus within the hamburger menu when it is open
  useFocusTrap(menuRef, isOpen);

  return (
    <div className="hamburger-menu-container" ref={menuRef}>
      <div className="hamburger-icon" onClick={toggleMenu(isOpen, setIsOpen)}>
        <i className="fa fa-bars"></i>
      </div>
      {isOpen && (
        <div className="burger-menu"> 
          <button className="hamburger-close-popup" onClick={toggleMenu(isOpen, setIsOpen)}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <nav className="burger-nav-links">
            <a href="/" className="burger-Home">HOME</a>
            <a href="/gallery" className="burger-gallery">GALLERY</a>
            <a href="/artists" className="burger-artists">ARTISTS</a>
            <a href="/about" className="burger-about">ABOUT US</a>
          </nav>
          <div className="divider"></div>
          <nav className="burger-nav-links">
            {session && (
              <a href="/settings/edit-profile" className="burger-settings">
                SETTINGS
              </a>
            )}
            {session ? (
              <a className='burger-logout' onClick={() => {
                handleLogout(setSession, navigate);
                toggleMenu(isOpen, setIsOpen)();
              }}>Log out</a>
            ) : (
              <AuthButton />
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
console.log('Rendering Hamburger component');
export default HamburgerMenu; */


import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import AuthButton from "@components/buttons/auth-button/AuthButton";
import { toggleMenu } from '@utils/menuHandlers';
import { handleLogout } from '@utils/authHandlers';
import useAuthStore from '@store/useAuthStore';
import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import useCloseOnResize from '@hooks/useCloseOnResize';
import useFocusTrap from '@hooks/useFocusTrap';
import "./HamburgerMenu-style.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useAuthStore((state) => state.session);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close hamburger menu on window resize above 1000px
  useCloseOnResize(isOpen, setIsOpen, 1000);

  // Disable scrolling when popup is open
  useGlobalScrollLock(isOpen, false);

  // Trap focus within the hamburger menu when it is open
  useFocusTrap(menuRef, isOpen);

  return (
    <div className="hamburger-menu-container" ref={menuRef}>
      <div className="hamburger-icon" onClick={toggleMenu(isOpen, setIsOpen)}>
        <i className="fa fa-bars"></i>
      </div>
      {isOpen && (
        <div className="burger-menu"> 
          <button className="hamburger-close-popup" onClick={toggleMenu(isOpen, setIsOpen)}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <nav className="burger-nav-links">
            <a href="/" className="burger-Home">HOME</a>
            <a href="/gallery" className="burger-gallery">GALLERY</a>
            <a href="/artists" className="burger-artists">ARTISTS</a>
            <a href="/about" className="burger-about">ABOUT US</a>
          </nav>
          <div className="divider"></div>
          <nav className="burger-nav-links">
            {session && (
              <a href="/settings/edit-profile" className="burger-settings">
                SETTINGS
              </a>
            )}
            {session ? (
              <a className='burger-logout' onClick={async () => {
                await handleLogout(navigate);
                setIsOpen(false);
              }}>Log out</a>
            ) : (
              <AuthButton />
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

console.log('Rendering Hamburger component');
export default HamburgerMenu;