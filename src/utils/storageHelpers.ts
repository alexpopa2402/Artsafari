// utils/storageHelpers.js
import { supabase } from '@services/supabaseClient';

export const getAvatarUrl = async (avatarPath: string) => {
  if (!avatarPath || avatarPath.startsWith('http')) {
    return avatarPath; // Already a valid URL or undefined
  }

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(avatarPath);

  if (!data || !data.publicUrl) {
    console.error('Error generating public URL');
    return null; // Return null to indicate a failure
  }

  return data.publicUrl;
};
