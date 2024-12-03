import './SearchBar-style.css';

const SearchBar = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search artwork, artist..."
        className="search-input"
      />
      <div className="search-button">
        <i className="fa fa-search"></i>
      </div>
    </div>
  );
};

export default SearchBar;
