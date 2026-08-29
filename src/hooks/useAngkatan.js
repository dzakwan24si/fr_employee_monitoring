import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAngkatan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAngkatan = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch raw angkatan data
      const { data: angkatanData, error: angkatanError } = await supabase
        .from('angkatan')
        .select('*')
        .order('id_angkatan', { ascending: false });
        
      if (angkatanError) throw angkatanError;

      // 2. Fetch culled data
      const { data: culledData } = await supabase.from('culled').select('id_angkatan, kategori_status');

      // 3. Aggregate Mathematically
      // Rumus User: Lulus = Jumlah Awal - (Culled + Tidak Lulus)
      const aggregatedData = (angkatanData || []).map(item => {
        // Filter culled data for this angkatan
        const relatedCulled = (culledData || []).filter(c => c.id_angkatan === item.id_angkatan);
        
        // Count each category
        const totalTidakLulus = relatedCulled.filter(c => c.kategori_status === 'Tidak Lulus').length;
        const totalCulled = relatedCulled.filter(c => c.kategori_status !== 'Tidak Lulus').length; // Default to Culled if null

        // Calculate Lulus
        const totalLulus = item['Jumlah Awal'] - totalCulled - totalTidakLulus;

        return {
          ...item,
          lulus_calculated: totalLulus > 0 ? totalLulus : 0,
          culled_calculated: totalCulled,
          tidak_lulus_calculated: totalTidakLulus
        };
      });

      setData(aggregatedData);

    } catch (err) {
      console.error("Error fetching angkatan:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAngkatan();
  }, []);

  const addAngkatan = async (newAngkatan) => {
    const { data: inserted, error } = await supabase
      .from('angkatan')
      .insert([{
        angkatan: newAngkatan.angkatan,
        'Jumlah Awal': newAngkatan['Jumlah Awal']
        // We do not save lulus because it is dynamically calculated now!
      }])
      .select();
    
    if (error) throw error;
    // Format before adding to state
    const formatted = {
      ...inserted[0],
      lulus_calculated: inserted[0]['Jumlah Awal'],
      culled_calculated: 0,
      tidak_lulus_calculated: 0
    };
    setData([formatted, ...data]);
    return formatted;
  };

  const updateAngkatan = async (id, updatedAngkatan) => {
    const { data: updated, error } = await supabase
      .from('angkatan')
      .update({
        angkatan: updatedAngkatan.angkatan,
        'Jumlah Awal': updatedAngkatan['Jumlah Awal']
      })
      .eq('id_angkatan', id)
      .select();
      
    if (error) throw error;
    
    setData(data.map(item => {
      if(item.id_angkatan === id) {
        const newLulus = updated[0]['Jumlah Awal'] - item.culled_calculated - item.tidak_lulus_calculated;
        return {
          ...updated[0],
          lulus_calculated: newLulus > 0 ? newLulus : 0,
          culled_calculated: item.culled_calculated,
          tidak_lulus_calculated: item.tidak_lulus_calculated
        };
      }
      return item;
    }));
    return updated[0];
  };

  const deleteAngkatan = async (id) => {
    const { error } = await supabase
      .from('angkatan')
      .delete()
      .eq('id_angkatan', id);
      
    if (error) throw error;
    setData(data.filter(item => item.id_angkatan !== id));
  };

  return { 
    data, 
    loading, 
    error, 
    addAngkatan, 
    updateAngkatan, 
    deleteAngkatan, 
    refetch: fetchAngkatan 
  };
}
