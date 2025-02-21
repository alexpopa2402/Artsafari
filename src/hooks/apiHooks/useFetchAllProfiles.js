// src/hooks/useProfiles.js
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useFetchAllProfiles = () => {
    const supabase = useSupabaseClient();

  return useInfiniteQuery({
    queryKey: ['profiles'],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .range(pageParam * 10, (pageParam + 1) * 10 - 1); // Fetch 10 profiles per page
      if (error) throw error;
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined; // Fetch next page if there are more profiles
    }
  });
};