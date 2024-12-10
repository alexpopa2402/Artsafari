import { useState, useRef } from 'react';
import './SearchBar-style.css';

import useClickOutside from '@hooks/useClickOutside';
import useCloseOnResize from '@hooks/useCloseOnResize';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

    // Close the search container when clicking outside of it
    useClickOutside(searchRef, () => setIsOpen(false));

    // Close the search container when resizing the window
    useCloseOnResize(isOpen, setIsOpen, 1080);

  return (
    <div ref={searchRef} className={`search-container ${isOpen ? 'active' : ''}`}>
      <input
        type="text"
        placeholder="Search artwork, artist..."
        className="search-input"
      />
      <div className="search-button" onClick={handleButtonClick}>
        <i className="fa fa-search"></i>
      </div>
    </div>
  );
};

export default SearchBar;