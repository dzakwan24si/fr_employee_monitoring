// Script untuk debug data culled dan lihat format alasan yang sebenarnya
// Jalankan: node debug_culled.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugCulledData() {
  console.log('=== DEBUG CULLED DATA FORMAT ===\n');

  try {
    // Fetch semua culled data
    const { data: culledData } = await supabase
      .from('culled')
      .select('*')
      .limit(50); // Get first 50 entries
    
    if (!culledData || culledData.length === 0) {
      console.log('❌ Tidak ada culled data ditemukan');
      return;
    }

    console.log(`✅ Total Culled Entries: ${culledData.length}\n`);
    console.log('📋 Format Data Culled:\n');
    
    // Show first 5 entries untuk melihat format
    culledData.slice(0, 5).forEach((item, idx) => {
      console.log(`${idx + 1}. ID: ${item.id_culled}`);
      console.log(`   Nama: ${item.nama}`);
      console.log(`   Kategori Status: "${item.kategori_status}"`);
      console.log(`   Alasan (RAW): "${item.alasan}"`);
      
      // Test pattern matching
      const hasInClassBracket = (item.alasan || '').match(/\[In\s*Class\]/i);
      const hasOJTBracket = (item.alasan || '').match(/\[OJT\]/i);
      const hasInClassSimple = (item.alasan || '').toLowerCase().includes('in class');
      const hasOJTSimple = (item.alasan || '').toLowerCase().includes('ojt');
      
      console.log(`   Pattern Test:`);
      console.log(`     - [In Class] (dengan bracket): ${hasInClassBracket ? '✅ MATCH' : '❌ NO MATCH'}`);
      console.log(`     - [OJT] (dengan bracket): ${hasOJTBracket ? '✅ MATCH' : '❌ NO MATCH'}`);
      console.log(`     - 'in class' (tanpa bracket): ${hasInClassSimple ? '✅ MATCH' : '❌ NO MATCH'}`);
      console.log(`     - 'ojt' (tanpa bracket): ${hasOJTSimple ? '✅ MATCH' : '❌ NO MATCH'}`);
      console.log('');
    });

    // Summary
    console.log('\n📊 SUMMARY:');
    const withBracketInClass = culledData.filter(c => (c.alasan || '').match(/\[In\s*Class\]/i)).length;
    const withBracketOJT = culledData.filter(c => (c.alasan || '').match(/\[OJT\]/i)).length;
    const withSimpleInClass = culledData.filter(c => (c.alasan || '').toLowerCase().includes('in class')).length;
    const withSimpleOJT = culledData.filter(c => (c.alasan || '').toLowerCase().includes('ojt')).length;
    
    console.log(`  [In Class] dengan bracket: ${withBracketInClass}`);
    console.log(`  [OJT] dengan bracket: ${withBracketOJT}`);
    console.log(`  'in class' tanpa bracket: ${withSimpleInClass}`);
    console.log(`  'ojt' tanpa bracket: ${withSimpleOJT}`);
    
    if (withBracketInClass === 0 && withSimpleInClass > 0) {
      console.log('\n⚠️  DITEMUKAN: Format alasan mungkin "in class" tanpa bracket');
    }
    if (withBracketOJT === 0 && withSimpleOJT > 0) {
      console.log('⚠️  DITEMUKAN: Format alasan mungkin "ojt" tanpa bracket');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugCulledData();
