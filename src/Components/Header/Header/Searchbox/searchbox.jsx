import './searchbox-style.css';

const SearchBar = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search artwork, artist..."
        className="search-input"
      />
      <button className="search-button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
