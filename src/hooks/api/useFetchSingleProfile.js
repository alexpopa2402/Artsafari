
import { useQuery } from '@tanstack/react-query';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export const useFetchSingleProfile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  return useQuery({
    queryKey: ['profile', user?.id], // Unique key per user
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id // Fetch only if user exists
  });
};