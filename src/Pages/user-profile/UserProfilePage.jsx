import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@api/fetchSingleProfile'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

const UserProfile = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const { data: fetchedProfile, isLoading, error } = useQuery({
    queryKey: ['profile', user.id],
    queryFn: () => fetchProfile(supabase, user.id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!user,
    onSuccess: (data) => {
      console.log('Fetched profile:', data);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  if (!fetchedProfile) return <p>No profile data found</p>;

  return (
    <div>
      <h1>{fetchedProfile.full_name}</h1>
      <img src={fetchedProfile.avatar_url} alt="avatar" />
    </div>
  );
};

export default UserProfile;

/* import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import ArtworkCard from '@components/UI/artwork-card/ArtworkCard';

import './UserProfilePage-style.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [artworks, setArtworks] = useState([]);

  const user = useUser();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setFetchError('User not authenticated');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch the profile using the user's ID
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single(); // Use .single() to get a single profile

        if (profileError) {
          setFetchError('Could not fetch profile data');
          setProfile(null);
          console.log(profileError);
        } else {
          setProfile(profileData);
          setFetchError(null);
        }

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
    </div>
  );
};
console.log('Rendering User Profile component');

export default UserProfile; */