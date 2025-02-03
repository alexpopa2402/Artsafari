export const fetchProfile = async (supabase, userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  };
  