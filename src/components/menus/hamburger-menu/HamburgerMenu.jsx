import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useSession } from "@supabase/auth-helpers-react";

import AuthButton from '@components/buttons/auth-button/AuthButton';
import LogoutButton from '@components/buttons/logout-button/LogoutButton';

import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import useCloseOnResize from '@hooks/useCloseOnResize';
import useFocusTrap from '@hooks/useFocusTrap';

import "./HamburgerMenu-style.css";

const HamburgerMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Disable scrolling when the hamburger menu is open and account for scrollbar width
  useGlobalScrollLock(isOpen);

  // Close hamburger menu on window resize above 856px
  useCloseOnResize(isOpen, setIsOpen, 856);

  // Trap focus within the hamburger menu when it is open
  useFocusTrap(menuRef, isOpen);

 // Function to handle navigation and close the hamburger menu
  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu-container" ref={menuRef}>
      <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa fa-bars"></i>
      </div>
      {isOpen && (
        <div className="burger-menu">
          <div className="animation-container"></div>
          <div className="animation-container"></div>
          <div className="animation-container"></div>
          <div className="animation-container"></div>
          <div className="close-popup-container">
            <button className="hamburger-close-popup" onClick={() => setIsOpen(!isOpen)}>
              <i className="fa fa-solid fa-circle-xmark"></i>
            </button>
          </div>
          <nav className="burger-nav-links">
            <button onClick={() => handleNavigate('/')} className="burger-Home"><i className="fa fa-solid fa-igloo"></i>Home</button>
            <button onClick={() => handleNavigate('/gallery')} className="burger-gallery"><i className="fa fa-solid fa-palette"></i>Gallery</button>
            <button onClick={() => handleNavigate('/artists')} className="burger-artists"><i className="fa fa-solid fa-id-card"></i> Artists</button>
            <button onClick={() => handleNavigate('/about')} className="burger-about"><i className="fa fa-solid fa-wand-sparkles"></i>About us</button>
          </nav>
          <div className="divider"></div>
          <nav className="burger-nav-links">
            {session && (
              <button onClick={() => handleNavigate('/settings/edit-profile')} className="burger-settings">
                <i className="fa fa-cog settings-icon"></i>
                Settings
              </button>
            )}
            {session ? (
              <LogoutButton closeMenu={() => setIsOpen(false)} />
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