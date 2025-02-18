/* // src/hooks/useUserArtworks.js
import { useInfiniteQuery } from '@tanstack/react-query';
import { useUser } from '@supabase/auth-helpers-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useFetchArtworks = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  return useInfiniteQuery({
    queryKey: ['artworks', user?.id],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching page:', pageParam);
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('user_id', user.id)
        .range(pageParam * 10, (pageParam + 1) * 10 - 1); // Fetch 10 artworks per page
      if (error) throw error;
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined; // Fetch next page if there are more artworks
    },
    enabled: !!user?.id
  });
}; */

import { useInfiniteQuery } from '@tanstack/react-query';
import { useUser } from '@supabase/auth-helpers-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useFetchArtworks = (fetchAll = false) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  return useInfiniteQuery({
    queryKey: ['artworks', fetchAll ? 'all' : user?.id],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching page:', pageParam);
      let query = supabase.from('artworks').select('*').range(pageParam * 10, (pageParam + 1) * 10 - 1); // Fetch 10 artworks per page
      if (!fetchAll && user?.id) {
        query = query.eq('user_id', user.id);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined; // Fetch next page if there are more artworks
    },
    enabled: fetchAll || !!user?.id
  });
};