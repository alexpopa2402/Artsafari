import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { supabase } from '@services/supabaseClient';
import '@pages/settings/SettingsPage-style.css';

const EditProfilePage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  const handleChooseImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="edit-profile-page">
      <div className="form-layout">
        <div className="form-group">
          <div className="avatar-group">
            <div className="avatar-circle">
              <i className="fa fa-camera"></i>
            </div>
            <div 
              className='avatar-text' 
              onClick={handleChooseImageClick}>Choose an Image</div>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </div>
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
      <button type="submit" className="save-button" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default EditProfilePage;