import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { getAvatarUrl } from '@utils/storageHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import DOMPurify from 'dompurify';

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    full_name: '',
    profession: '',
    positions: '',
    about: '',
    avatar_url: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [success, setSuccess] = useState(false);

  const user = useUser();
  const supabase = useSupabaseClient();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setFetchError('User not authenticated');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          setFetchError('Error fetching profile.');
          return;
        }

        const avatarUrl = data.avatar_url
          ? await getAvatarUrl(data.avatar_url)
          : null;

        setProfile({ ...data, avatar_url: avatarUrl });
        setFetchError(null);
      } catch (err) {
        console.error(err);
        setFetchError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, [user, supabase]);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setProfile((prevProfile) => ({ ...prevProfile, [name]: sanitizedValue }));
  };

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  // Handle deleting the avatar
  const deleteAvatar = async () => {
    if (profile.avatar_url) {
      const oldFileName = profile.avatar_url.split('/').pop();
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([`public/${oldFileName}`]);

      if (deleteError) {
        console.error('Error deleting avatar:', deleteError);
        return;
      }

      setProfile((prevProfile) => ({ ...prevProfile, avatar_url: null }));
    }
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  // Handle saving the profile
  const handleSave = async () => {
    setLoading(true);
    setFetchError(null);
    setSuccess(false);

    try {
      let avatar_url = profile.avatar_url;

      // Upload new avatar if a file is selected
      if (avatarFile) {
        if (profile.avatar_url) {
          // Delete the old avatar
          await deleteAvatar();
        }

        // Upload the new avatar
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`public/${avatarFile.name}`, avatarFile, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Get the public URL of the uploaded avatar
        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(uploadData.path);

        avatar_url = publicUrlData.publicUrl;
      }

      // Update profile in the database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          profession: profile.profession,
          positions: profile.positions,
          about: profile.about,
          avatar_url,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      handleSuccess();
    } catch (err) {
      console.error(err);
      setFetchError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  console.log('EditProfilePage rendered');

  return (
    <div className="edit-profile-page">

      {fetchError && <p className="error-popup">{fetchError}</p>}
      {success && <p className="success-popup">Profile updated successfully!</p>}

      <form className='form-layout'>

        <div className="form-group">
          <div className='avatar-group'>
            {avatarPreview ? (
              <div className='avatar-circle'>
                <img
                  className='avatar-circle'
                  src={avatarPreview}
                  alt="Avatar preview"
                  width="100"
                  height="100"
                />
              </div>
            ) : profile.avatar_url ? (
              <div className='avatar-circle'>
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                />
              </div>
            ) : (
              <div className='empty-avatar-circle'>
                <i className="fa fa-camera camera-icon"></i>
              </div>
            )}

            <div
              className="select-avatar-text"
              onClick={() =>
                document
                  .getElementById('avatar')
                  .click()
              }
            >
              Select Avatar
            </div>

            <input
              type="file"
              id="avatar"
              name='avatar'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />

            {(profile.avatar_url || avatarPreview) && (
              <div
                className="delete-avatar-text"
                onClick={deleteAvatar}
                style={{ cursor: 'pointer', fontSize: 'small', color: 'red' }}
              >
                or Delete
              </div>
            )}
          </div>

        </div>


        <div className="form-group">
          <label htmlFor="full_name">Name*</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            placeholder="Enter your name - field cannot be empty"
            maxLength="30"
            pattern="[A-Za-z\s]*"
            title="Required field - can only contain letters and spaces"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={profile.profession}
            onChange={handleChange}
            placeholder="Enter your profession"
            maxLength="30"
            pattern="[A-Za-z\s]*"
            title="Profession can only contain letters and spaces"
          />
        </div>

        <div className="form-group">
          <label htmlFor="positions">Other Relevant Positions</label>
          <input
            type="text"
            id="positions"
            name="positions"
            value={profile.positions}
            onChange={handleChange}
            placeholder="Enter your positions"
            maxLength="30"
            pattern="[A-Za-z\s]*"
            title="Positions can only contain letters and spaces"
          />
        </div>

        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            value={profile.about}
            onChange={handleChange}
            placeholder="Tell us about yourself - max 1200 characters"
            maxLength="1200"
            pattern="[A-Za-z0-9\s.,!?@#&()\-]*"
            title="About can contain letters, numbers, and common symbols"
          />
        </div>

        <button
          type="button"
          className="save-button"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Save'}
        </button>
      </form>
    </div>
  );
}