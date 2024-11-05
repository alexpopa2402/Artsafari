import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { supabase } from '@services/supabaseClient';
import './EditProfilePage-style.css';

const EditProfilePage = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.user_metadata?.name || '');
  const [profession, setProfession] = useState(user?.user_metadata?.profession || '');
  const [positions, setPositions] = useState(user?.user_metadata?.positions || '');
  const [about, setAbout] = useState(user?.user_metadata?.about || '');
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload avatar to Supabase
    if (avatar) {
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`public/${user.id}/${avatar.name}`, avatar);

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        return;
      }

      // Update user profile with avatar URL
      const avatarUrl = data.Key;
      const { error } = await supabase.auth.update({
        data: {
          name,
          profession,
          positions,
          about,
          avatar_url: avatarUrl,
        },
      });

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        navigate('/profile');
      }
    } else {
      // Update user profile without avatar
      const { error } = await supabase.auth.update({
        data: {
          name,
          profession,
          positions,
          about,
        },
      });

      if (error) {
        console.error('Error updating profile:', error);
      } else {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="edit-profile-page">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="avatar" className="avatar-label">
              <div className="avatar-circle">
                <i className="fa fa-camera"></i>
              </div>
              Choose an Image
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="positions">Other Relevant Positions</label>
            <input
              type="text"
              id="positions"
              value={positions}
              onChange={(e) => setPositions(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="about">About</label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;