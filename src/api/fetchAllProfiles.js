export const fetchAllProfiles = async (supabase) => {
    const { data, error } = await supabase
    .from('profiles')
    .select('*');
    
    if (error) {
      console.error('Error fetching profiles:', error);
      return [];
    }
    return data;
  };
  