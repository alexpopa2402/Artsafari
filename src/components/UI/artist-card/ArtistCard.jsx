import './ArtistCard-style.css';
import PropTypes from 'prop-types';

const ArtistCard = ({ name, description, imageUrl }) => {
  return (
    <div className="artist-card">
      <img src={imageUrl} alt={`${name}'s avatar`} />
      <div className="info">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ArtistCard;