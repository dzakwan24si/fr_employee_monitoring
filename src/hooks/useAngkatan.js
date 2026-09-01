import { useState, useEffect, useRef } from 'react';
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
      const { data: culledData } = await supabase.from('culled').select('id_angkatan, kategori_status, alasan');

      // 3. Aggregate Mathematically
      // Rumus User: Lulus = Jumlah Awal - (Culled + Tidak Lulus)
      const aggregatedData = (angkatanData || []).map(item => {
        // Filter culled data for this angkatan
        const relatedCulled = (culledData || []).filter(c => c.id_angkatan === item.id_angkatan);
        
        // Count each category
        const totalTidakLulus = relatedCulled.filter(c => c.kategori_status === 'Tidak Lulus').length;
        const totalCulled = relatedCulled.filter(c => c.kategori_status !== 'Tidak Lulus').length; // Default to Culled if null

        const resignInClass = relatedCulled.filter(c => c.kategori_status !== 'Tidak Lulus' && (c.alasan || '').toLowerCase().includes('in class')).length;
        const resignOjt = relatedCulled.filter(c => c.kategori_status !== 'Tidak Lulus' && (c.alasan || '').toLowerCase().includes('ojt')).length;

        // Calculate Lulus
        const totalLulus = item['Jumlah Awal'] - totalCulled - totalTidakLulus;

        return {
          ...item,
          lulus_calculated: totalLulus > 0 ? totalLulus : 0,
          culled_calculated: totalCulled,
          tidak_lulus_calculated: totalTidakLulus,
          resign_in_class_calculated: resignInClass,
          resign_ojt_calculated: resignOjt
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

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchAngkatan();
      hasFetched.current = true;
    }
  }, []);

  const addAngkatan = async (newAngkatan) => {
    let nextId = 1;
    if (data && data.length > 0) {
      nextId = Math.max(...data.map(item => item.id_angkatan || 0)) + 1;
    }

    const { data: inserted, error } = await supabase
      .from('angkatan')
      .insert([{
        id_angkatan: nextId,
        angkatan: newAngkatan.angkatan,
        'Jumlah Awal': newAngkatan['Jumlah Awal'],
        lulus: newAngkatan['Jumlah Awal'] // Satisfy NOT NULL constraint
      }])
      .select();
    
    if (error) throw error;
    
    // Format before adding to state
    const formatted = {
      ...inserted[0],
      lulus_calculated: inserted[0]['Jumlah Awal'],
      culled_calculated: 0,
      tidak_lulus_calculated: 0,
      resign_in_class_calculated: 0,
      resign_ojt_calculated: 0
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
          tidak_lulus_calculated: item.tidak_lulus_calculated,
          resign_in_class_calculated: item.resign_in_class_calculated,
          resign_ojt_calculated: item.resign_ojt_calculated
        };
      }
      return item;
    }));
    return updated[0];
  };

  const deleteAngkatan = async (id) => {
    // Delete related culled entries first to prevent foreign key constraint violation
    const { error: culledError } = await supabase
      .from('culled')
      .delete()
      .eq('id_angkatan', id);
      
    if (culledError) throw culledError;

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
