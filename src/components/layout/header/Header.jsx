import { useEffect, useState } from 'react';
import { supabase } from '@services/supabaseClient';
import { Link } from 'react-router-dom';
import './Header-style.css';
import SearchBar from '@components/UI/searchbar/SearchBar';
import AuthButton from '@components/auth/auth-button/AuthButton';
import HamburgerMenu from '@components/menus/hamburger-menu/HamburgerMenu';
import UserMenu from '@components/menus/user-menu/UserMenu';
import YBlogo from '@assets/images/logo/YBlogo.png';


const Header = () => {
  const [session, setSession] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 515);

  window.addEventListener('scroll', function () {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 515);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        if (authListener) {
          authListener.unsubscribe();
        }
        window.removeEventListener("resize", handleResize);
      };
    };
    fetchSession();
  }, []);

  return (
    <header className='main-header'>
      <div className='title-container'>
        <Link to='/' className="main-title">
          {isMobile ? <img src={YBlogo} alt="Youngblood Logo" className="logo" /> : <span>YoungBlood 3.0</span>}
        </Link>
        <p className="sub-title">by <a href='https://www.artsafari.ro/'>Artsafari</a></p>
      </div>
      <SearchBar />
      <nav className="nav-links">
        <Link to='/' className="gallery">HOME</Link>
        <Link to='/gallery' className="gallery">GALLERY</Link>
        <Link to='/artists' className='artists'>ARTISTS</Link>
        <Link to='/about' className="about">ABOUT US</Link>
      </nav>
        <HamburgerMenu />
        {session ? <UserMenu /> : <AuthButton />}
    </header>
  );
};

export default Header;

