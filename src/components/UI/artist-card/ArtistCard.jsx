import './ArtistCard-style.css';
import PropTypes from 'prop-types';

const ArtistCard = ({ name, profession, imageUrl }) => {

  return (

    <div className="card">
      <img className='card__img' src={imageUrl} alt={`${name}'s avatar`} />
      <img className='card__avatar' src={imageUrl} alt={`${name}'s avatar`} />
      <div className="card__title">{name}</div>
      <div className="card__subtitle">{profession}</div>
      <div className="card__wrapper">
        <button className="card__btn">profile</button>
        <button className="card__btn card__btn-solid">Follow</button>
      </div>
    </div>
  );
};

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  profession: PropTypes.string,
  positions: PropTypes.string,
};
export default ArtistCard;