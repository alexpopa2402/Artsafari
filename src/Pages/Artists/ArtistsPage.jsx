import { useState, useEffect } from 'react';
/* import { useSupabaseClient } from '@supabase/auth-helpers-react'; */
import {supabase} from '@services/supabaseClient';

import ArtistCard from '@components/UI/artist-card/ArtistCard';
import './ArtistsPage-style.css';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

/*   const supabaseClient = useSupabaseClient(); */

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*');

        if (error) {
          setFetchError('Error fetching artist data');
          setArtists([]);
        } else {
          setArtists(data);
        }
      } catch (error) {
        setFetchError('An error occurred while fetching artist data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (fetchError) {
    return <p>{fetchError}</p>;
  }

  return (
    <div className="artists-page">
      <div className="artist-cards-container">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.full_name}
            description={artist.about}
            imageUrl={artist.avatar_url}
            profession={artist.profession}
            positions={artist.positions}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;