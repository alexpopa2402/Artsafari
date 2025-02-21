import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './ArtworkCard-style.css';

const ArtworkCard = ({ artwork }) => {
  const navigate = useNavigate();

  const generateSlug = (id, title, year) => {
    return `${id}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${year}`;
  };

  const handleClick = () => {
    const slug = generateSlug(artwork.id,artwork.title, artwork.year);
    navigate(`/artwork/${slug}`);
  };

  return (
    <div className={`artwork stacked ${artwork.featured ? 'featured' : ''}`} onClick={handleClick}>
      <img 
        src={artwork.image_urls[0]} 
        alt={artwork.title} 
        className="artwork__img" 
      />
      <div className="artwork__content">
      <h1 className="artwork__author">{artwork.artist_name}</h1>
      <p className="artwork__title">{artwork.title}</p>
      <p className="artwork__year">{artwork.year}</p>
      </div>
    </div>
  );
};

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    image_urls: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.number,
    featured: PropTypes.bool,
    artist_name: PropTypes.string,
  }).isRequired,
};

export default ArtworkCard;