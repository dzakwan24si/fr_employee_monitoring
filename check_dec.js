async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=NAMA,STATUS,KATEGORI,LOKASI%20TERAKHIR,TAHUN%20TERMINATE,BULAN%20TERMINATE`, { headers });
  const data = await res.json();
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');
  const resignLulusan = resignStaff.filter(emp => emp.KATEGORI?.trim().toLowerCase() === 'alumni');
  
  const target = resignLulusan.filter(emp => 
     emp['TAHUN TERMINATE'] === 2025 && 
     (emp['BULAN TERMINATE'] === 'Dec' || emp['BULAN TERMINATE'] === 'Des')
  );
  console.log("Dec 2025 Resignations:", target);
}
check();
