import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useFetchSingleProfile } from '@hooks/api/useFetchSingleProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ButtonSpinner from '@components/loading-skeletons/ButtonSpinner/ButtonSpinner';
import './EditProfilePage-style.css';

interface ProfileFormData {
  full_name: string;
  profession?: string;
  positions?: string;
  about?: string;
}

export default function EditProfilePage() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const { data: profile } = useFetchSingleProfile();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();

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
      setTimeout(() => setSuccessMessage(''), 3000);
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

    setUploadProgress(0);
    const fileName = `avatar-${user.id}-${Date.now()}`;

    try {
      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Simulate progress since Supabase doesn't provide it
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null) return null;
          const newProgress = Math.min(prev + 10, 90);
          return newProgress;
        });
      }, 500);

      // Finalize after upload
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(null), 1000);

      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        await supabase
          .from('profiles')
          .update({ avatar_url: publicUrl })
          .eq('id', user.id);

        queryClient.invalidateQueries({
          queryKey: ['profile', user.id]
        });
        setAvatarPreview(URL.createObjectURL(file));
      }
    } catch (error) {
      setUploadProgress(null);
      setErrorMessage('Avatar upload failed');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="edit-profile-page">

      {/* Popup Messages */}
      {successMessage && (<div className="success-popup">{successMessage}</div>)}
      {errorMessage && (<div className="error-popup">{errorMessage}</div>)}
      <div className='personal-data-disclaimer'>The information you provide here will be publicly visible </div>
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
              ) : (avatarPreview || profile?.avatar_url) ? (
                <img
                  className="avatar-circle"
                  src={avatarPreview || profile?.avatar_url || ''}
                  alt="Avatar preview"
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
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])}
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