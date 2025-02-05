import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Artworkcard-style.css';

const ArtworkCard = ({ artwork, artistName }) => {
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
      <h2 className="artwork__title">{artwork.title}</h2>
      <p className="artwork__author">{artistName}</p>
      <p className="artwork__year">{artwork.year}</p>
      </div>
    </div>
  );
};

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    image_urls: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  artistName: PropTypes.string.isRequired,
};

export default ArtworkCard;