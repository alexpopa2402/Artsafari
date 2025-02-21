import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { useForm } from 'react-hook-form';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useFetchSingleProfile } from '@hooks/api/useFetchSingleProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ButtonSpinner from '@components/loaders/spinners/ButtonSpinner/ButtonSpinner';
import './EditProfilePage-style.css';
import { v4 as uuidv4 } from "uuid";
import { useCallback } from 'react';

interface ProfileFormData {
  full_name: string;
  profession?: string;
  positions?: string;
  about?: string;
}

const EditProfilePage = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const { data: profile } = useFetchSingleProfile();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<ProfileFormData>();

  // Reset form when profile data loads
  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name,
        profession: profile.profession,
        positions: profile.positions,
        about: profile.about
      });
    }
    console.log('profile reset');
  }, [profile, reset]);

  // Profile mutation with proper typing
  const profileMutation = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      setSuccessMessage('Profile saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds, allows the css popup (3sec duration) to show
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
    onError: () => {
      setErrorMessage('Failed to save profile');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  });

  // Handle avatar upload
  const handleAvatarUpload = async (file: File) => {
    if (!user?.id) return;

    setUploadProgress(0); // start spinner
    const fileName = `${uuidv4()}-${Date.now()}`;
    const filePath = `${user.id}/${fileName}`;

    try {
    // Compress and resize the image
    const options = {
      maxSizeMB: 0.05, // Maximum size in MB
      maxWidthOrHeight: 200, // Maximum width or height in pixels
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    console.log('compressedFile');
  
      // Upload new avatar
      const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, compressedFile, {
        upsert: true,
      });

      if (error) throw error;

      const publicUrl = `https://lnaxrtumnyzyegjcwlcs.supabase.co/storage/v1/object/public/avatars/${filePath}`;

      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl  })
        .eq('id', user.id);

      // Invalidate queries to refresh profile data
      queryClient.invalidateQueries({
        queryKey: ['profile', user.id]
      });

    // Delete old avatar if it exists
    if (profile?.avatar_url) {
      const oldFilePath = profile.avatar_url.split('/avatars/')[1];
      await supabase.storage
        .from('avatars')
        .remove([oldFilePath]);
        console.log('deleted old avatar');
    }
      console.log('uploaded new avatar');
      setSuccessMessage('Avatar uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      setErrorMessage('Avatar upload failed');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setUploadProgress(null); // stop
    }
  };

  //function to handle avatar change
  const onAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        handleAvatarUpload(e.target.files[0]);
      }
    },
    [handleAvatarUpload]
  );
  
  return (
    <div className="edit-profile-page">

      {/* Popup Messages */}
      {successMessage && (<div className="settings-page-success-popup">{successMessage}</div>)}
      {errorMessage && (<div className="settings-page-error-popup">{errorMessage}</div>)}
      <div className='personal-data-disclaimer'>
      <i className="fa-solid fa-circle-info"></i>The information you provide here will be publicly visible </div>
      <form
        className='form-layout'
        onSubmit={handleSubmit((data: ProfileFormData) => profileMutation.mutate(data))}>
        {/* Avatar Upload */}
        <div className="form-group">
          <div className="avatar-group">
            <div className="avatar-preview">
              {uploadProgress !== null ? (
                <div className="avatar-upload-spinner-container">
                     <ButtonSpinner/>
                </div>
              ) : (profile?.avatar_url) ? (
                <img
                  className="avatar-circle"
                  src={profile.avatar_url || ''}
                  /* alt="Avatar preview" */
                />
              ) : (
                <div className='empty-avatar-circle'>
                  <i className="fa fa-camera camera-icon"></i>
                </div>
              )}
            </div>
            <input
              id="avatar"
              type="file"
              name='avatar'
              accept="image/jpeg, image/jpg, image/png, image/webp"
              onChange={onAvatarChange}
              style={{ display: 'none' }}
            />
            <div
              className="choose-avatar-text"
              onClick={() => document.getElementById('avatar')?.click()}
            >
              Choose an Image
            </div>
          </div>

        </div>

        {/* Profile Fields */}
        <div className="form-group">
          <label htmlFor="full_name">Name*</label>
          <input
            {...register('full_name', { required: true })}
            id="full_name"
            placeholder="Enter your full name"
            maxLength={30}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profession">Profession</label>
          <input
            {...register('profession')}
            id="profession"
            placeholder="Enter your profession"
          />
        </div>

        <div className="form-group">
          <label htmlFor="positions">Positions</label>
          <input
            {...register('positions')}
            id="positions"
            placeholder="Enter relevant positions"
          />
        </div>

        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            {...register('about')}
            id="about"
            rows={4}
            placeholder="Tell us about yourself"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={profileMutation.isPending}
        >
          {profileMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>

        {profileMutation.isError && (
          <p className="error-message">Error saving profile. Please try again.</p>
        )}
      </form>
    </div>
  );
}
console.log('EditProfilePage rendered');

export default EditProfilePage;