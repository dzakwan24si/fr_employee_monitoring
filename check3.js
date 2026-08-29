import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dhqdnvuvtraugifpwlpc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
);

async function check() {
  const { count, error } = await supabase.from('employees').select('*', { count: 'exact', head: true });
  console.log("Total employees in DB:", count);
}

check();
