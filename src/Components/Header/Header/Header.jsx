
import "./header-style.css"
import SearchBox from './Searchbox/searchbox';
import "./Searchbox/searchbox-style.css"
import LoginRegisterButton from "./Login/loginButton/loginButton";
import "./Login/loginButton/loginButton-style.css"

const Header = () => {


  return (
    <header className='main-header'>
      <div className='title-container'>
        <a href='/' className="main-title">Young Blood 3.0</a>
        <p className="small-title">by <a href='https://www.artsafari.ro/'>Artsafari</a></p>
      </div>
      <nav className="navbar">
      <a href='/gallery' className="gallery">GALLERY</a>
      <a href='/artists' className='artists'>ARTISTS</a>
      <a href='/about' className="about">ABOUT US</a>
          <SearchBox/>
      </nav>
      <LoginRegisterButton/>
    </header>
  );
};

export default Header;
