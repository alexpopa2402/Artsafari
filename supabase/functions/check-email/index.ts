import { serve } from 'https://deno.land/x/sift@0.5.0/mod.ts';
import { createClient } from 'https://deno.land/x/supabase@1.0.0/mod.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  const { email } = await req.json();
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ exists: data.length > 0 }), { status: 200 });
});