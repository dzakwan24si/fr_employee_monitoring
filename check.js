import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const lines = env.split('\n');
let supabaseUrl = '';
let supabaseKey = '';
lines.forEach(line => {
  if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
});

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Fetching culled table...");
  const { data: culledData, error: culledError } = await supabase
    .from('culled')
    .select('*')
    .limit(1);
    
  if (culledError) console.error("Culled Error:", culledError);
  else console.log("Culled Data:", culledData);

  console.log("\nFetching angkatan table...");
  const { data: angkatanData, error: angkatanError } = await supabase
    .from('angkatan')
    .select('*')
    .limit(1);
    
  if (angkatanError) console.error("Angkatan Error:", angkatanError);
  else console.log("Angkatan Data:", angkatanData);
}

checkSchema();
