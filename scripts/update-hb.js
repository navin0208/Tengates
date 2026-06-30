import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  const { data, error } = await supabase
    .from('projects')
    .select('gallery')
    .eq('slug', 'hb-reality-nashik')
    .single();

  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  let gallery = data.gallery || { before: [], during: [], after: [] };
  
  gallery.during = [
    '/20260421_151935.heic',
    '/20260323_190952.jpg',
    '/20260217_115428.jpg'
  ];

  const { error: updateError } = await supabase
    .from('projects')
    .update({ 
      img: '/compressed_WAREHOUSE P4.jpg',
      gallery: gallery
    })
    .eq('slug', 'hb-reality-nashik');

  if (updateError) {
    console.error('Update error:', updateError);
  } else {
    console.log('Successfully updated HB Reality in Supabase.');
  }
}

main();
