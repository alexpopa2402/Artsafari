import { useState } from "react";
import "./hamburgerMenu-style.css";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-icon" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>
      {menuOpen && (
        <div className="burger-menu">
          <nav className="burger-nav-links">
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
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;