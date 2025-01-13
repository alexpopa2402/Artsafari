// utils/storageHelpers.js
import { supabase } from '@services/supabaseClient';

export const getAvatarUrl = async (avatarPath) => {
  if (!avatarPath || avatarPath.startsWith('http')) {
    return avatarPath; // Already a valid URL or undefined
  }

  const { data, error } = supabase.storage
    .from('avatars')
    .getPublicUrl(avatarPath);

  if (error) {
    console.error('Error generating public URL:', error);
    return null; // Return null to indicate a failure
  }

  return data.publicUrl;
};
