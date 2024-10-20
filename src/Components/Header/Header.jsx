import { useEffect, useState } from 'react';
import { supabase } from '../../Client/supabaseClient';
import { Link } from 'react-router-dom';
import './Header-style.css';
import SearchBar from '../SearchBar/searchbar';
import '../SearchBar/SearchBar-style.css';
import LoginRegisterButton from '../Login/LoginRegisterButton/LoginRegisterButton';
import '../Login/loginRegisterButton/LoginRegisterButton-style.css';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import '../HamburgerMenu/HamburgerMenu-style.css';
import UserMenu from '../UserMenu/UserMenu';
import '../UserMenu/UserMenu-style.css';
import YBlogosplash from '../../Assets/YBlogosplash2.png';


const Header = () => {
  const [session, setSession] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 515);

  window.addEventListener('scroll', function() {
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
        authListener.unsubscribe();
        window.removeEventListener("resize", handleResize);
      };
    };

    fetchSession();
  }, []);

  return (
    <header className='main-header'>
      <div className='title-container'>
      <Link to='/' className="main-title">
        {isMobile ? <img src={YBlogosplash} alt="Youngblood Logo" className="logo" /> : <span><span className="initial">Y</span>oung <span className="initial">B</span>lood 3.0</span>}
      </Link>
        <p className="sub-title">by <a href='https://www.artsafari.ro/'>Artsafari</a></p>
      </div>
      <SearchBar/>
      <nav className="nav-links">
      <Link to='/' className="gallery">HOME</Link>
      <Link to='/gallery' className="gallery">GALLERY</Link>
      <Link to='/artists' className='artists'>ARTISTS</Link>
      <Link to='/about' className="about">ABOUT US</Link>
      </nav>
      <HamburgerMenu/>
      {session ? <UserMenu /> : <LoginRegisterButton />}
    </header>
  );
};

export default Header;

