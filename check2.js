import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dhqdnvuvtraugifpwlpc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocWRudnV2dHJhdWdpZnB3bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4NjcxODQsImV4cCI6MjEwMzQ0MzE4NH0.ZPznTg47YLu9atU2wTJbIzWlKC4Q2eUQJdJ50Yr1u3I'
);

async function check() {
  const { data, error } = await supabase.from('employees').select('KATEGORI, STATUS');
  if (error) {
    console.error(error);
    return;
  }
  const activeStaff = data.filter(emp => emp.STATUS === 'Eksis' || emp.STATUS === 'Aktif');
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');
  
  const isAlumni = (k) => k?.trim().toLowerCase() === 'alumni';
  const isNonAlumni = (k) => {
    const val = k?.trim().toLowerCase();
    return val === 'non-alumni' || val === 'non alumni';
  };

  console.log("Total Active:", activeStaff.length);
  console.log("Active Alumni:", activeStaff.filter(e => isAlumni(e.KATEGORI)).length);
  console.log("Active Non-Alumni:", activeStaff.filter(e => isNonAlumni(e.KATEGORI)).length);
  
  console.log("Total Resign:", resignStaff.length);
  console.log("Resign Alumni:", resignStaff.filter(e => isAlumni(e.KATEGORI)).length);
  console.log("Resign Non-Alumni:", resignStaff.filter(e => isNonAlumni(e.KATEGORI)).length);
}

check();
