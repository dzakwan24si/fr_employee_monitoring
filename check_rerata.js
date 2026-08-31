async function check() {
  const url = 'https://dhqdnvuvtraugifpwlpc.supabase.co/rest/v1';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
  };

  const res = await fetch(`${url}/employees?select=STATUS,TAHUN%20TERMINATE,BULAN%20TERMINATE,KATEGORI`, { headers });
  const data = await res.json();
  
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');
  const resignLulusan = resignStaff.filter(emp => emp.KATEGORI?.trim().toLowerCase() === 'alumni');
  
  // Find which year produces Jan:1, Feb:2, Mar:6, May:7
  const years = [2024, 2025, 2026];
  years.forEach(y => {
    const yLulusan = resignLulusan.filter(emp => Number(emp["TAHUN TERMINATE"]) === y);
    const byMonthL = {};
    yLulusan.forEach(emp => {
      let m = emp["BULAN TERMINATE"];
      if (m) {
        m = m.trim();
        if (m === "Oct") m = "Okt";
        if (m === "Des") m = "Dec";
        byMonthL[m] = (byMonthL[m] || 0) + 1;
      }
    });
    console.log(`Lulusan ${y}:`, byMonthL);
  });
}
check();
