import './ArtistCard-style.css';

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

export default ArtistCard;