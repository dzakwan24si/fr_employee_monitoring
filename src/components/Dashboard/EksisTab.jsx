import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

export function EksisTab({ data = [] }) {
  
  // Filter active staff only
  const activeStaff = data.filter(emp => emp.STATUS === 'Eksis' || emp.STATUS === 'Aktif');

  // Aggregation helper
  const aggregateLocationsByRegion = (dataset, regionKeyword) => {
    const locations = {};
    dataset.forEach(emp => {
      const region = (emp["REGION TERAKHIR"] || "").toLowerCase();
      if (region.includes(regionKeyword.toLowerCase())) {
        const loc = emp["LOKASI TERAKHIR"] || "Unknown";
        locations[loc] = (locations[loc] || 0) + 1;
      }
    });
    
    return Object.keys(locations).map(key => ({
      name: key,
      val: locations[key]
    })).sort((a, b) => b.val - a.val); // Sort descending
  };

  const dataRiau = aggregateLocationsByRegion(activeStaff, "riau");
  const dataKalbar = aggregateLocationsByRegion(activeStaff, "kalbar");
  const dataKubar = aggregateLocationsByRegion(activeStaff, "kubar");

  // Time based logic
  const currentYear = new Date().getFullYear();
  
  const active1Tahun = activeStaff.filter(emp => {
    const joinYear = emp["JOIN DATE"] ? new Date(emp["JOIN DATE"]).getFullYear() : currentYear;
    return (currentYear - joinYear) <= 1;
  });

  const active3Tahun = activeStaff.filter(emp => {
    const joinYear = emp["JOIN DATE"] ? new Date(emp["JOIN DATE"]).getFullYear() : currentYear;
    const diff = currentYear - joinYear;
    return diff > 1 && diff <= 3;
  });

  const active5Tahun = activeStaff.filter(emp => {
    const joinYear = emp["JOIN DATE"] ? new Date(emp["JOIN DATE"]).getFullYear() : currentYear;
    const diff = currentYear - joinYear;
    return diff > 3 && diff <= 5;
  });

  // Aggregate locations across all regions for time-based charts
  const aggregateAllLocations = (dataset) => {
    const locations = {};
    dataset.forEach(emp => {
      const loc = emp["LOKASI TERAKHIR"] || "Unknown";
      locations[loc] = (locations[loc] || 0) + 1;
    });
    return Object.keys(locations).map(key => ({
      name: key,
      val: locations[key]
    })).sort((a, b) => b.val - a.val);
  };

  const dataLulusan1Tahun = aggregateAllLocations(active1Tahun);
  const dataLulusan3Tahun = aggregateAllLocations(active3Tahun);
  const dataLulusan5Tahun = aggregateAllLocations(active5Tahun);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-[#2c8f42]/20">
          <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
          <p className="text-sm font-extrabold text-[#2c8f42]">{`Jumlah: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (title, chartData) => (
    <div className="bg-[#f0f9f3] p-6 rounded-3xl border border-[#2c8f42]/20 shadow-sm flex flex-col items-center">
      <h3 className="text-xs font-extrabold text-[#1a5b28] uppercase tracking-wider mb-6 text-center">{title}</h3>
      <div className="w-full h-[250px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1e8d8" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#1a5b28' }} axisLine={false} tickLine={false} interval={0} angle={-45} textAnchor="end" />
              <YAxis tick={{ fontSize: 10, fill: '#1a5b28' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#eaf4ec' }} />
              <Bar dataKey="val" fill="#14756c" radius={[4, 4, 0, 0]} barSize={12}>
                <LabelList dataKey="val" position="top" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#1a5b28' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#14756c]/60 font-bold">
            Tidak ada data
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#35a892] p-6 rounded-3xl">
      
      {/* Top Row: Penempatan Awal per Region */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderChart("Penempatan Lulusan Region Riau", dataRiau)}
        {renderChart("Penempatan Lulusan Region Kalbar", dataKalbar)}
        {renderChart("Penempatan Lulusan Region Kubar", dataKubar)}
      </div>

      {/* Middle Row: Lulusan Eksis 1 Tahun & 3 Tahun */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderChart("Lokasi Lulusan Eksis <= 1 Tahun", dataLulusan1Tahun)}
        {renderChart("Lokasi Lulusan Eksis 2 - 3 Tahun", dataLulusan3Tahun)}
      </div>

      {/* Bottom Row: Lulusan Eksis 5 Tahun */}
      <div className="grid grid-cols-1 gap-6">
        {renderChart("Lokasi Lulusan Eksis 4 - 5 Tahun", dataLulusan5Tahun)}
      </div>

    </div>
  );
}
