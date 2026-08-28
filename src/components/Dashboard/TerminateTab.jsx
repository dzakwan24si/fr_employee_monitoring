import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

export function TerminateTab({ data = [] }) {
  
  // Filter resign staff only
  const resignStaff = data.filter(emp => emp.STATUS === 'Terminate' || emp.STATUS === 'Resign' || emp.STATUS === 'Culled');

  // Aggregation helpers
  const aggregateByField = (dataset, fieldName) => {
    const grouped = {};
    dataset.forEach(emp => {
      const val = emp[fieldName];
      if (val !== undefined && val !== null && val !== "") {
        grouped[val] = (grouped[val] || 0) + 1;
      }
    });
    
    return Object.keys(grouped).map(key => ({
      name: String(key),
      val: grouped[key]
    })).sort((a, b) => {
      // numeric sort if possible
      const numA = parseFloat(a.name);
      const numB = parseFloat(b.name);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.name.localeCompare(b.name);
    });
  };

  const aggregateByLocation = (dataset) => {
    const locations = {};
    dataset.forEach(emp => {
      const loc = emp["LOKASI TERAKHIR"] || "Unknown";
      locations[loc] = (locations[loc] || 0) + 1;
    });
    return Object.keys(locations).map(key => ({
      name: key,
      val: locations[key]
    })).sort((a, b) => b.val - a.val); // Sort descending by count
  };

  const dataTurnOverTahun = aggregateByField(resignStaff, "TAHUN TERMINATE");
  const dataTurnOverLamaTahun = aggregateByField(resignStaff, "LAMA BEKERJA (TAHUN)");
  
  // Custom sorting for months
  const monthOrder = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Okt": 10, "Nov": 11, "Dec": 12 };
  let dataTurnOverBulan = aggregateByField(resignStaff, "BULAN TERMINATE").sort((a, b) => {
    return (monthOrder[a.name] || 99) - (monthOrder[b.name] || 99);
  });

  const dataLocations = aggregateByLocation(resignStaff);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-red-200">
          <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
          <p className="text-sm font-extrabold text-red-500">{`Jumlah: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (title, chartData) => (
    <div className="bg-[#fcf3f3] p-6 rounded-3xl border border-red-100 shadow-sm flex flex-col items-center">
      <h3 className="text-xs font-extrabold text-red-900 uppercase tracking-wider mb-6 text-center">{title}</h3>
      <div className="w-full h-[250px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fcdcdc" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#7f1d1d' }} axisLine={false} tickLine={false} interval={0} angle={-45} textAnchor="end" />
              <YAxis tick={{ fontSize: 10, fill: '#7f1d1d' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#fce8e8' }} />
              <Bar dataKey="val" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={16}>
                <LabelList dataKey="val" position="top" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#7f1d1d' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-red-400/80 font-bold">
            Tidak ada data
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#35a892] p-6 rounded-3xl">
      
      {/* Top Row: Turn Over Overviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderChart("Turn Over Lulusan Per Tahun Terminate", dataTurnOverTahun)}
        {renderChart("Turn Over Berdasarkan Lama Tahun Bekerja", dataTurnOverLamaTahun)}
      </div>

      {/* Middle Row: Monthly Turn Overs */}
      <div className="grid grid-cols-1 gap-6">
        {renderChart("Rerata Turn Over Berdasarkan Bulan Terminate", dataTurnOverBulan)}
      </div>

      {/* Bottom Row: Resign Locations */}
      <div className="grid grid-cols-1 gap-6">
        {renderChart("Persebaran Lokasi Karyawan Resign", dataLocations)}
      </div>

    </div>
  );
}
