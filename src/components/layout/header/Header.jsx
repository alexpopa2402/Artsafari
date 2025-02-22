import { useEffect } from 'react';
import { setupScrollListener } from '@utils/scrollHandlers';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';

import SearchBar from '@components/UI/searchbar/SearchBar';
import AuthButton from '@components/buttons/auth-button/AuthButton';
import UserMenu from '@components/menus/user-menu/UserMenu';
import HamburgerMenu from '@components/menus/hamburger-menu/HamburgerMenu';
import YBlogo from '@assets/images/logo/YBlogo.png';
/* import UserMenuSkeleton from '@components/loaders/skeletons/UserMenuSkeleton/UserMenuSkeleton' */

import './Header-style.css';


const Header = () => {
  const { session, isLoading } = useSessionContext();
  const navigate = useNavigate();

  
  // listens for scroll events and adds/removes the 'shrink' class to the header
  useEffect(() => {
    console.log('scrollListener effect');
    const scrollListener = setupScrollListener();
    return () => { //returns a cleanup function that removes the event listener
      scrollListener();
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <header className='main-header'>
      <div className='header-container'>
        <div className='title-container'>
          <h1 className="main-title" onClick={() => navigate('/')}>
            <img src={YBlogo} alt="Youngblood Logo" className="logo" />
            <span className="text">Young Blood</span>
          </h1>
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
        {
          !session ? <AuthButton /> : <UserMenu />
        }
      </div>
    </header>
  );
};
console.log('Rendering Header component');
export default Header;