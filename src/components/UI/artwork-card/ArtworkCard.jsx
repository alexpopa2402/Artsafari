
import PropTypes from 'prop-types';
import './ArtworkCard-style.css';

const ArtworkCard = ({ car }) => {
    return (
        <div className={`card stacked ${car.featured ? 'featured' : ''}`}>
            <img src={car.image} alt={car.title} className="card__img" />
            <div className="card__content">
                <h2 className="card__title">{car.title}</h2>
                <p className="card__price">{car.price}</p>
                <p className="card__description">{car.description}</p>
            </div>
        </div>
    );
};

ArtworkCard.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        featured: PropTypes.bool,
    }).isRequired,
};

export default ArtworkCard;