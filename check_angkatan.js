async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/angkatan`, { headers });
  const data = await res.json();
  console.log("Angkatan Data:", data);
}
check();
