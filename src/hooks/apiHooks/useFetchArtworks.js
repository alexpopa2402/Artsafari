// This hook fetches all the artworks from the Supabase database. 
// It uses the useInfiniteQuery hook from react-query to fetch the artworks in paginated form. The query key is based on whether to fetch all artworks or only the user's artworks.
// The query function fetches the artworks based on the user ID if the user is authenticated. 
// The getNextPageParam function determines whether to fetch the next page based on the number of artworks fetched in the last page. 
// The enabled boolean flag is set based on whether the user is authenticated or not.

import { useInfiniteQuery } from '@tanstack/react-query';
import { useUser } from '@supabase/auth-helpers-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useFetchArtworks = (fetchAll = false) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  return useInfiniteQuery({
    queryKey: ['artworks', fetchAll ? 'all' : user?.id], // choose the query key based on whether to fetch all artworks or only the user's artworks
    queryFn: async ({ pageParam = 0 }) => {
      console.log('Fetching page:', pageParam);
      let query = supabase.from('artworks').select('*').range(pageParam * 10, (pageParam + 1) * 10 - 1); // Fetch 10 artworks per page
      if (!fetchAll && user?.id) {
        query = query.eq('user_id', user.id); // compares the user_id column with the currently authenticated user's ID
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

// simplified version of the useFetchArtworks hook that fetches all artworks without pagination and filtering based on the user ID.

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
