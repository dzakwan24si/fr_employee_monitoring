async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=NAMA,STATUS,KATEGORI,REGION%20TERAKHIR,ANGKATAN%20FR%20ACADEMY,LOKASI%20TERAKHIR`, { headers });
  const data = await res.json();
  const alumni = data.filter(emp => emp.KATEGORI?.trim().toLowerCase() === 'alumni');
  
  const activeAlumni = alumni.filter(emp => emp.STATUS === 'Eksis' || emp.STATUS === 'Aktif');
  
  const regions = {};
  activeAlumni.forEach(emp => {
     let r = emp['REGION TERAKHIR']?.trim().toLowerCase() || 'unknown';
     regions[r] = (regions[r] || 0) + 1;
  });
  console.log("Active Alumni by Region:", regions);
}
check();
