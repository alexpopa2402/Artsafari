import React from 'react';
import { useEffect } from 'react';
import { setupScrollListener } from '@utils/scrollHandlers';
import { Link } from 'react-router-dom';
import SearchBar from '@components/UI/searchbar/SearchBar';
import AuthButton from '@components/buttons/auth-button/AuthButton';
import UserMenu from '@components/menus/user-menu/UserMenu';
import HamburgerMenu from '@components/menus/hamburger-menu/HamburgerMenu';
import YBlogo from '@assets/images/logo/YBlogo.png';
/* import './Header-style.css'; */
import useAuthStore from '@store/useAuthStore';

const Header = () => {
  const {session, fetchAuthData, initializeAuthListener, loading } = useAuthStore();

  useEffect(() => {
    fetchAuthData();
    const cleanup = initializeAuthListener();
    return cleanup;
  }, [fetchAuthData, initializeAuthListener]);

  
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
        {!loading && (session ? <UserMenu /> : <AuthButton />)}
      </div>
    </header>
  );
};
console.log('Rendering Header component');
export default React.memo(Header);