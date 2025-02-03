export const fetchUserArtworks = async (supabase, userId) => {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('user_id', userId);
  
    if (error) {
      console.error('Error fetching artworks:', error);
      return [];
    }
    return data;
  };
  