import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabase = createClient(envVars['VITE_SUPABASE_URL'], envVars['VITE_SUPABASE_ANON_KEY']);

async function checkDb() {
  const { data, error } = await supabase.from('employees').select('*').limit(1);
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Data:", data);
    if (data && data.length > 0) {
      console.log("Columns:", Object.keys(data[0]));
    } else {
      console.log("Table is empty, cannot infer columns automatically.");
    }
  }
}

checkDb();
