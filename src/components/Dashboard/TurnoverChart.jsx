import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChevronDown } from "lucide-react";

export function TurnoverChart({ summaryData = [] }) {
  const [selectedYear, setSelectedYear] = useState("All");

  const chartDataRaw = [...summaryData].sort((a, b) => {
    // Basic sorting by Year in Angkatan name if possible
    const yearA = parseInt((a.angkatan || "").match(/\d{4}/)) || 0;
    const yearB = parseInt((b.angkatan || "").match(/\d{4}/)) || 0;
    if (yearA !== yearB) return yearA - yearB;
    return (a.angkatan || "").localeCompare(b.angkatan || "");
  });

  const availableYears = Array.from(new Set(chartDataRaw.map(d => {
    const match = (d.angkatan || "").match(/\d{4}/);
    return match ? match[0] : null;
  }).filter(Boolean))).sort((a, b) => b - a);

  const chartData = chartDataRaw.filter(d => {
    if (selectedYear === "All") return true;
    const match = (d.angkatan || "").match(/\d{4}/);
    return match && match[0] === selectedYear;
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Tingkat Kelulusan Peserta per Angkatan</h3>
          <p className="text-sm text-gray-500 mt-1">Status akhir peserta Academy (Lulus, Culled, Tidak Lulus)</p>
        </div>
        
        <div className="relative">
          <select 
            className="appearance-none flex items-center gap-2 text-sm text-gray-600 border border-gray-200 pl-4 pr-9 py-1.5 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] bg-white cursor-pointer"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">Semua angkatan</option>
            {availableYears.map(year => (
              <option key={year} value={year}>Tahun {year}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        </div>
      </div>
      
      <div className="flex-1 min-h-[350px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="angkatan" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} dx={-10} />
              
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
              
              <Bar dataKey="lulus_calculated" name="Lulus" stackId="a" fill="#2ecc71" radius={[0, 0, 0, 0]} barSize={35} />
              <Bar dataKey="culled_calculated" name="Culled (Gagal Training)" stackId="a" fill="#e74c3c" radius={[0, 0, 0, 0]} barSize={35} />
              <Bar dataKey="tidak_lulus_calculated" name="Tidak Lulus (Evaluasi)" stackId="a" fill="#95a5a6" radius={[6, 6, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Tidak ada data untuk tahun {selectedYear}
          </div>
        )}
      </div>
    </div>
  );
}
