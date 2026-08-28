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
import { dummyEmployees } from "../../data/dummyEmployees";

export function TurnoverChart() {
  // Process dummy data to get turnover per batch (angkatan)
  const turnoverData = dummyEmployees.reduce((acc, emp) => {
    if (emp.status === "Terminate" || emp.status === "Culled") {
      const batch = emp.angkatan;
      if (!acc[batch]) {
        acc[batch] = { name: batch, Terminate: 0, Culled: 0 };
      }
      acc[batch][emp.status] += 1;
    }
    return acc;
  }, {});

  const data = Object.values(turnoverData);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Turnover per Angkatan</h3>
      <div className="h-80 w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                cursor={{ fill: '#f5f7fa' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="Terminate" stackId="a" fill="#ef4444" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Culled" stackId="a" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Belum ada data turnover
          </div>
        )}
      </div>
    </div>
  );
}
