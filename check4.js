import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dhqdnvuvtraugifpwlpc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
);

async function check() {
  let allData = [];
  let currentOffset = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: chunk, error } = await supabase
      .from('employees')
      .select('*')
      .range(currentOffset, currentOffset + pageSize - 1);
    
    if (error) {
      console.error(error);
      return;
    }
    
    allData = [...allData, ...chunk];
    if (chunk.length < pageSize) {
      hasMore = false;
    } else {
      currentOffset += pageSize;
    }
  }

  const activeStaff = allData.filter(emp => emp.STATUS === 'Eksis' || emp.STATUS === 'Aktif');
  const resignStaff = allData.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');
  
  const isAlumni = (k) => k?.trim().toLowerCase() === 'alumni';
  const isNonAlumni = (k) => {
    const val = k?.trim().toLowerCase();
    return val === 'non-alumni' || val === 'non alumni';
  };

  console.log("Total Active in DB:", activeStaff.length);
  console.log("Active Alumni:", activeStaff.filter(e => isAlumni(e.KATEGORI)).length);
  console.log("Active Non-Alumni:", activeStaff.filter(e => isNonAlumni(e.KATEGORI)).length);
  
  console.log("Total Resign in DB:", resignStaff.length);
}

check();
