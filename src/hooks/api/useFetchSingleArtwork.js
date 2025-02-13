import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useFetchSingleArtwork = (artworkId) => {
  const supabase = useSupabaseClient();

  return useQuery({
    queryKey: ['artwork', artworkId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', artworkId)
        .single();
      if (error) throw error;
      return data;
    }
  });
};