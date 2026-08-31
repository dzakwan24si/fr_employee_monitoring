async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=STATUS,KATEGORI,LAMA%20BEKERJA%20(TAHUN),TAHUN%20TERMINATE`, { headers });
  const data = await res.json();
  
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');
  const resignLulusan = resignStaff.filter(emp => emp.KATEGORI?.trim().toLowerCase() === 'alumni');
  
  const byLamaTahun = {};
  resignLulusan.forEach(emp => {
    let val = emp['LAMA BEKERJA (TAHUN)'];
    if (val !== null) {
      val = Math.floor(Number(val));
      byLamaTahun[val] = (byLamaTahun[val] || 0) + 1;
    }
  });
  console.log("Lama Tahun (Lulusan):", byLamaTahun);
}

check();
