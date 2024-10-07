import { useEffect, useState } from "react";
import "./Header-style.css"
import SearchBar from "../SearchBar/searchbar";
import "../SearchBar/SearchBar-style.css"
import LoginRegisterButton from "../Login/loginRegisterButton/loginRegisterButton";
import "../Login/loginRegisterButton/LoginRegisterButton-style.css"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "../HamburgerMenu/HamburgerMenu-style.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 515);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 515);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className='main-header'>
      <div className='title-container'>
      <Link to='/' className="main-title">{isMobile ? "YB" : "Young Blood 3.0"}</Link>
        <p className="sub-title">by <a href='https://www.artsafari.ro/'>Artsafari</a></p>
      </div>
      <SearchBar/>
      <nav className="nav-links">
      <Link to='/gallery' className="gallery">GALLERY</Link>
      <Link to='/artists' className='artists'>ARTISTS</Link>
      <Link to='/about' className="about">ABOUT US</Link>
      </nav>
      <LoginRegisterButton/>
      <HamburgerMenu/>
    </header>
  );
};

export default Header;

