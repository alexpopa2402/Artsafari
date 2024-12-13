import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { handleLogout } from '@utils/authHandlers';
import AuthButton from "@components/buttons/auth-button/AuthButton";
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

  // Disable scrolling when the hamburger menu is open and account for scrollbar width
  useGlobalScrollLock(isOpen);

  // Close hamburger menu on window resize above 856px
  useCloseOnResize(isOpen, setIsOpen, 856);

  // Trap focus within the hamburger menu when it is open
  useFocusTrap(menuRef, isOpen);

  return (
    <div className="hamburger-menu-container" ref={menuRef}>
      <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa fa-bars"></i>
      </div>
      {isOpen && (
        <div className="burger-menu"> 
          <button className="hamburger-close-popup" onClick={() => setIsOpen(!isOpen)}>
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