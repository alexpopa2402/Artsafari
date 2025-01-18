import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import Spinner from '@components/loading-skeletons/Spinner/Spinner';

const UserProfile = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [artworks, setArtworks] = useState([]);

  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setFetchError('User not authenticated');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch the artworks using the user's ID
        const { data: artworksData, error: artworksError } = await supabase
          .from('artworks')
          .select('*')
          .eq('user_id', user.id);

        if (artworksError) {
          console.error('Error fetching artwork:', artworksError);
        } else {
          setArtworks(artworksData);
        }
      } catch (error) {
        setFetchError('An error occurred while fetching data');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, supabase]);

  if (isLoading) {
    return <Spinner />
  }
  if (fetchError) return <p>{fetchError}</p>;

  return (
      <div className="gallery-section">
        <div className="gallery-container">
          {artworks.length === 0 ? (
            <div className="empty-gallery-message">
              Nothing to see here - click upload to start sharing your artwork with the world!
            </div>
          ) : (
            artworks.map((artwork) => (
              <div key={artwork.id} className="gallery-item">
                <div className="artwork-details">
                  <h3>{artwork.title}</h3>
                  <p><strong>Medium:</strong> {artwork.medium}</p>
                  <p><strong>Year:</strong> {artwork.year}</p>
                  <p><strong>Materials:</strong> {artwork.materials}</p>
                  <p><strong>Dimensions:</strong> {artwork.height} x {artwork.width} x {artwork.depth} cm</p>
                  <p><strong>Notes:</strong> {artwork.notes}</p>
                </div>
                {artwork.image_urls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Artwork ${index + 1}`}
                    style={{ width: "200px", height: "auto" }}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
  );
};

export default UserProfile;