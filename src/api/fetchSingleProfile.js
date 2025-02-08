export const fetchProfile = async (supabase, userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    throw new Error(error.message);
  }

  console.log('Fetched profile data:', data);
  return data;
};
