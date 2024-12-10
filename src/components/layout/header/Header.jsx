import { useEffect, useState } from 'react';
import { fetchSession, subscribeToAuthChanges } from '@services/authService';
import { setupScrollListener } from '@utils/scrollHandlers';
import { Link } from 'react-router-dom';
import SearchBar from '@components/UI/searchbar/SearchBar';
import AuthButton from '@components/buttons/auth-button/AuthButton';
import UserMenu from '@components/menus/user-menu/UserMenu';
import HamburgerMenu from '@components/menus/hamburger-menu/HamburgerMenu';
import YBlogo from '@assets/images/logo/YBlogo.png';
import './Header-style.css';

const Header = () => {
  const [session, setSession] = useState(null);

  // Initialize authentication
  useEffect(() => {
    const initializeAuth = async () => {
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

  // listens for scroll events and adds/removes the 'scrolled' class to the header
  useEffect(() => {
    const scrollListener = setupScrollListener();

    // Cleanup the scroll listener
    return () => {
      scrollListener();
    };
  }, []);

  return (
    <header className='main-header'>
      <div className='header-container'>
        <div className='title-container'>
          <Link to='/' className="main-title">
            <img src={YBlogo} alt="Youngblood Logo" className="logo" />
            <span className="text">YoungBlood 3.0</span>
          </Link>
          <p className="sub-title">
            by{' '}
            <a href='https://www.artsafari.ro/'>
              Artsafari
            </a>
          </p>
        </div>
        <SearchBar />
        <nav className="nav-links">
          <Link to='/' className="home">Home</Link>
          <Link to='/gallery' className="gallery">Gallery</Link>
          <Link to='/artists' className='artists'>Artists</Link>
          <Link to='/about' className="about">About Us</Link>
        </nav>
        <HamburgerMenu />
        {session ? <UserMenu /> : <AuthButton />}
      </div>
    </header>
  );
};
console.log('Rendering Header component');
export default Header;

