import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { getAvatarUrl } from '@utils/storageHelpers.js';

interface Profile {
  id: string;
  full_name: string;
  profession: string;
  positions: string;
  about: string;
  avatar_url: string | null;
}

export const useFetchSingleProfile = (): UseQueryResult<Profile, Error> => {
  const user = useUser();
  const supabase = useSupabaseClient();

  return useQuery<Profile, Error>({
    queryKey: ['profile', user?.id], // Unique key per user
    queryFn: async () => {
      console.log('Fetching profile data...');

      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, profession, positions, about, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Profile not found');

      // Transform avatar URL
      if (data.avatar_url) {
        data.avatar_url = await getAvatarUrl(data.avatar_url);
      }

      return data as Profile;
    },
    enabled: !!user?.id, // Fetch only if user exists
    //retry: 2, // Retry twice before failing
/*     staleTime: 1000 * 60 * 5, // 5 minutes */
  });
};