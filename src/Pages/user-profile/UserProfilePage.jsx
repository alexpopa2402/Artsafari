/* import { useFetchProfile} from '@hooks/api/useFetchSingleProfile';

const UserProfile = () => {

  const { data: profile, isLoading, error } = useFetchSingleProfile();

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{profile.full_name}</h1>
      <img src={profile.avatar_url} alt="Profile" />
    </div>
  );
};

export default UserProfile; */

/* import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'; */
import { useNavigate } from 'react-router-dom';
import { useFetchSingleProfile } from '@hooks/api/useFetchSingleProfile';
import { useFetchArtworks } from '@hooks/api/useFetchArtworks';

import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import ArtworkCard from '@components/UI/artwork-card/ArtworkCard';

import './UserProfilePage-style.css';

const UserProfile = () => {
/*   const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [artworks, setArtworks] = useState([]); */

/*   const user = useUser();
  const supabase = useSupabaseClient(); */
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading, error: profileError } = useFetchSingleProfile();
  const {
    data: artworksData,
    isLoading: artworksLoading,
    error: artworksError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchArtworks();

  if (profileLoading || artworksLoading) {
    return <Spinner />;
  }

  if (profileError) {
    return <p>Error fetching profile: {profileError.message}</p>;
  }

  if (artworksError) {
    return <p>Error fetching artworks: {artworksError.message}</p>;
  }

  const artworks = artworksData?.pages.flat() || [];

  return (
    <div className="user-page">
      <div className="profile-section">
        <div className='profile-info'>
            <div className="profile-avatar-circle">
              <div className='profile-picture'>
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" />
                ) : (
                  <i className="fa fa-camera camera-icon"></i>
                )}
              </div>
            </div>
          <div className="profile-text-container">
            <div className='profile-greeting'>{profile.full_name || 'User'}</div>
            <div className='profile-details'>
              </div>
          </div>
        </div>
        <div className='profile-page-buttons'>
          <button
            className="profile-upload-button"
            onClick={() => navigate('/upload-artwork')}>
            <i className="fa fa-solid fa-upload"></i>
            Upload Artwork
          </button>
          <button
            className="profile-settings-button"
            onClick={() => navigate('/settings/edit-profile')}
            aria-label="Settings"
          >
            <i className="fa fa-cog settings-icon"></i>
            Settings
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="gallery-container">
        {artworks.length === 0 ? (
          <div className="empty-gallery-message">
            Nothing to see here - click upload to start sharing your artwork with the world!
          </div>
        ) : (
          <div className="product-grid">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                artistName={profile.full_name}
              />
            ))}
          </div>
        )}
      </div>
      {hasNextPage && (
          <button
            className="load-more-button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}
    </div>
  );
};
console.log('Rendering User Profile component');

export default UserProfile;