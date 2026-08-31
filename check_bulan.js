async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=STATUS,KATEGORI,LAMA%20BEKERJA%20(BULAN)`, { headers });
  const data = await res.json();
  
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');
  const resignLulusan = resignStaff.filter(emp => emp.KATEGORI?.trim().toLowerCase() === 'alumni');
  
  let countStaff3 = 0, countLulusan3 = 0;
  
  resignStaff.forEach(emp => {
    let val = emp['LAMA BEKERJA (BULAN)'];
    if (val !== null && Math.floor(Number(val)) === 3) countStaff3++;
  });
  
  resignLulusan.forEach(emp => {
    let val = emp['LAMA BEKERJA (BULAN)'];
    if (val !== null && Math.floor(Number(val)) === 3) countLulusan3++;
  });
  
  console.log("Month 3 - Staff:", countStaff3, "Lulusan:", countLulusan3);
  
  const distLulusan = {};
  resignLulusan.forEach(emp => {
    let val = emp['LAMA BEKERJA (BULAN)'];
    if (val !== null) {
      val = Math.floor(Number(val));
      if (val <= 12) {
         distLulusan[val] = (distLulusan[val] || 0) + 1;
      }
    }
  });
  console.log("Dist Lulusan 0-12:", distLulusan);
}

check();
