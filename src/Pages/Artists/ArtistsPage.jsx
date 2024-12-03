import { useState, useEffect } from 'react';
import ArtistCard from '@components/UI/artist-card/ArtistCard';
import './ArtistsPage-style.css';
import { placeholderArtists } from './artistsDatabase';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setArtists(placeholderArtists);
    }, 1000);
    // Replace the URL with your actual data source
    //fetch('/api/artists')
    //.then(response => response.json())
    //.then(data => setArtists(data))
    //.catch(error => console.error('Error fetching artist data:', error));
  }, []);


  return (
    <div className="artists-page">
      <h1>Artists Page</h1>
      {artists.length === 0 && (
        <Spinner />
      )}
      <div className="artist-cards-container">
        {artists.map((artist, index) => (
          <ArtistCard key={index} name={artist.name} description={artist.description} imageUrl={artist.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;