import { useNavigate } from 'react-router-dom';
import { useFetchSingleProfile } from '@hooks/apiHooks/useFetchSingleProfile';
import { useFetchArtworks } from '@hooks/apiHooks/useFetchArtworks';

import Spinner from '@components/loaders/spinners/GlobalSpinner/Spinner';
import ArtworkCard from '@components/UI/artwork-card/ArtworkCard';

import './UserProfilePage-style.css';

const UserProfile = () => {

  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading, error: profileError } = useFetchSingleProfile();

  const {
    data: artworksData,
    isLoading: artworksLoading,
    error: artworksError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchArtworks(false);

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
      <div className="user-gallery-container">
        {artworks.length === 0 ? (
          <div className="empty-user-gallery-message">
            Nothing to see here - click upload to start sharing your artwork with the world!
          </div>
        ) : (
          <div className='user-gallery'>
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                artistName={artwork.artist_name}
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