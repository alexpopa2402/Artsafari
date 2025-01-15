import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@components/loading-skeletons/Spinner/Spinner';

import './UserProfilePage-style.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const navigate = useNavigate();

  const images = [
    '/src/assets/images/carousel images/81.jpg',
    '/src/assets/images/carousel images/81.jpg',
    '/src/assets/images/carousel images/81.jpg',
    '/src/assets/images/carousel images/81.jpg',
    '/src/assets/images/carousel images/81.jpg',
    '/src/assets/images/carousel images/81.jpg',
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setFetchError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        // Fetch the profile using the user's ID
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single(); // Use .single() to get a single profile

        if (error) {
          setFetchError('Could not fetch profile data');
          setProfile(null);
          console.log(error);
        } else {
          setProfile(data);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError('An error occurred while fetching profile data');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, supabaseClient]);

  if (loading) {
    return <Spinner />
  }
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <div className="user-page">
      <div className="profile-section">
        <div className='profile-info'>
          <label htmlFor="avatar" className="avatar-label">
            <div className="profile-avatar-circle">
              <div className='profile-picture'>
              {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" />
                ) : (
                  <i className="fa fa-camera camera-icon"></i>
                )}
              </div>
            </div>
          </label>
          <div className="profile-text-info">
            <span>Welcome, {profile.full_name || 'User'}!</span>
            <div>Profession: {profile.profession || 'N/A'}</div>
            <div>About: {profile.about || 'N/A'}</div>
            <div>Other relevant positions: {profile.positions || 'N/A'}</div>
          </div>
        </div>
        <div className='gallery-buttons'>
          <button
            className="profile-upload-button"
            onClick={() => navigate('/upload-artwork')}>
            Upload Your Artwork
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
      <div className="gallery-section">
        <div className="gallery-container">
          {images.length === 0 ? (
            <div className="empty-gallery-message">
              Nothing to see here - click upload to start sharing your artwork with the world!
            </div>
          ) : (
            images.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Gallery ${index}`} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
console.log('Rendering User Profile component');

export default UserProfile;