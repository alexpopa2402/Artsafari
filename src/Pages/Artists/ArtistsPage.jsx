import ArtistCard from './ArtistCard/ArtistCard';
import './ArtistsPage-style.css';

const ArtistsPage = () => {
  const placeholderArtists = [
    { name: 'Artist 1', description: 'This is a placeholder description for Artist 1.', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Artist 2', description: 'This is a placeholder description for Artist 2.', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Artist 3', description: 'This is a placeholder description for Artist 3.', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Artist 4', description: 'This is a placeholder description for Artist 4.', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Artist 5', description: 'This is a placeholder description for Artist 5.', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Artist 6', description: 'This is a placeholder description for Artist 6.', imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="artists-page">
      <h1>Artists Page</h1>
      <p>This is the artists page. Add artists to start seeing profiles.</p>
      <div className="artist-cards-container">
        {placeholderArtists.map((artist, index) => (
          <ArtistCard key={index} name={artist.name} description={artist.description} imageUrl={artist.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;