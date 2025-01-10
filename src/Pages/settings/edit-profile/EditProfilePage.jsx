/* import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';
import { supabase } from '@services/supabaseClient';
import '@pages/settings/SettingsPage-style.css';


const EditProfilePage = () => {
  const { user } = useAuthStore();



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
              >Choose an Image</div>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"

          />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"

          />
        </div>
        <div className="form-group">
          <label htmlFor="positions">Other Relevant Positions</label>
          <input
            type="text"
            id="positions"

          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"

          ></textarea>
        </div>
      </div>
      <button type="submit" className="save-button">
        Save
      </button>
    </div>
  );
};
export default EditProfilePage; */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@services/supabaseClient';
import useAuthStore from '@store/useAuthStore';
import '@pages/settings/SettingsPage-style.css';
import PIC from '@assets/PIC.png';

const EditProfilePage = () => {
  const { user, setUser, profile } = useAuthStore(); // Assuming `setUser` updates the global state
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: profile.full_name || '',
    profession: profile.profession || '',
    positions: profile.positions || '',
    about: profile.about || '',
    avatar: profile.avatar_url || null,
    avatarPreview: PIC,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: previewUrl,
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    let avatarUrl = user?.formData.avatar_url;

    // Upload avatar if a new file is selected
    if (formData.avatar instanceof File) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`public/${formData.avatar.name}`, formData.avatar, { upsert: true });

      if (error) {
        alert('Error uploading avatar');
        setIsSaving(false);
        return;
      }
      avatarUrl = data.path;
    }

    // Update profile data in Supabase
    const updates = {
      full_name: formData.name,
      profession: formData.profession,
      positions: formData.positions,
      about: formData.about,
      avatar_url: avatarUrl,
    };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      alert('Error updating profile');
      setIsSaving(false);
      return;
    }

    // Update global state
    setUser((prevUser) => ({
      ...prevUser,
      user_metadata: {
        ...prevUser.user_metadata,
        ...updates,
      },
    }));

    alert('Profile updated successfully!');
    setIsSaving(false);
    navigate(0); // Refresh the current page
  };

  return (
    <div className="edit-profile-page">
      <div className="form-layout">
        <div className="form-group">
          <div className="avatar-group">
            <div className="avatar-circle">
              {formData.avatar ? (
                <img src={formData.avatarPreview} alt="Avatar" />
              ) : (
                <img src={formData.avatarPreview} alt="Avatar Preview" />
              )}
            </div>
            <div className="avatar-text" onClick={() => document.getElementById('avatar').click()}>
              Choose an Image
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="avatar"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="positions">Other Relevant Positions</label>
          <input
            type="text"
            id="positions"
            name="positions"
            value={formData.positions}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        type="button"
        className="save-button"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default EditProfilePage;