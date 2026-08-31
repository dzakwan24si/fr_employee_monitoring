async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=STATUS,TAHUN%20TERMINATE,BULAN%20TERMINATE`, { headers });
  const data = await res.json();
  
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');
  
  const y2026 = resignStaff.filter(emp => Number(emp["TAHUN TERMINATE"]) === 2026);
  const byMonth = {};
  y2026.forEach(emp => {
     const m = emp["BULAN TERMINATE"];
     if (m) byMonth[m.trim()] = (byMonth[m.trim()] || 0) + 1;
  });
  
  console.log("All Staff 2026 by month:", byMonth);
}
check();
