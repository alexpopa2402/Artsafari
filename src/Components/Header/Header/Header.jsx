import { useEffect, useState } from "react";
import "./header-style.css"
import SearchBox from './Searchbox/searchbox';
import "./Searchbox/searchbox-style.css"
import LoginRegisterButton from "./Login/loginButton/loginButton";
import "./Login/loginButton/loginButton-style.css"
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import "./HamburgerMenu/HamburgerMenu-style.css";

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
        <a href='/' className="main-title">{isMobile ? "YB" : "Young Blood 3.0"}</a>
        <p className="sub-title">by <a href='https://www.artsafari.ro/'>Artsafari</a></p>
      </div>
      <nav className="nav-links">
      <a href='/gallery' className="gallery">GALLERY</a>
      <a href='/artists' className='artists'>ARTISTS</a>
      <a href='/about' className="about">ABOUT US</a>
      </nav>
      <SearchBox/>
      <LoginRegisterButton/>
      <HamburgerMenu/>
    </header>
  );
};

export default Header;

