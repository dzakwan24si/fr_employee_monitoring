async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=NAMA,STATUS,KATEGORI,REGION%20TERAKHIR,REGION%20AWAL%20PENEMPATAN`, { headers });
  const data = await res.json();
  const alumni = data.filter(emp => emp.KATEGORI?.trim().toLowerCase() === 'alumni');
  
  const regionsTerakhir = {};
  const regionsAwal = {};
  alumni.forEach(emp => {
     let rt = emp['REGION TERAKHIR']?.trim().toLowerCase() || 'unknown';
     let ra = emp['REGION AWAL PENEMPATAN']?.trim().toLowerCase() || 'unknown';
     if (rt.includes('riau')) rt = 'riau';
     if (rt.includes('kalbar')) rt = 'kalbar';
     if (rt.includes('kubar')) rt = 'kubar';
     if (ra.includes('riau')) ra = 'riau';
     if (ra.includes('kalbar')) ra = 'kalbar';
     if (ra.includes('kubar')) ra = 'kubar';
     regionsTerakhir[rt] = (regionsTerakhir[rt] || 0) + 1;
     regionsAwal[ra] = (regionsAwal[ra] || 0) + 1;
  });
  console.log("Terakhir:", regionsTerakhir);
  console.log("Awal:", regionsAwal);
}
check();
