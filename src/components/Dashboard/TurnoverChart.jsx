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

export function TurnoverChart({ data = [] }) {
  const turnoverData = data.reduce((acc, emp) => {
    if (emp.STATUS === "Terminate" || emp.STATUS === "Resign" || emp.STATUS === "Culled") {
      const batch = emp["ANGKATAN FR ACADEMY"] || "Tidak diketahui";
      if (!acc[batch]) {
        acc[batch] = { name: batch, Terminate: 0, Resign: 0, Culled: 0 };
      }
      const status = emp.STATUS === "Resign" ? "Resign" : emp.STATUS;
      acc[batch][status] += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(turnoverData);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Turnover Analytics</h3>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">
          Semua angkatan <ChevronDown size={14} />
        </button>
      </div>
      
      <div className="flex-1 min-h-[300px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
              <Bar dataKey="Terminate" name="Terminate" stackId="a" fill="#0a4239" radius={[0, 0, 0, 0]} barSize={40} />
              <Bar dataKey="Resign" name="Resign" stackId="a" fill="#e08b35" radius={[0, 0, 0, 0]} barSize={40} />
              <Bar dataKey="Culled" stackId="a" fill="#2c8f42" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No turnover data
          </div>
        )}
      </div>
    </div>
  );
}
