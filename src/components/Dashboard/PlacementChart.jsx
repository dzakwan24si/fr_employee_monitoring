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

export function PlacementChart() {
  // Process dummy data to get active employees placement per region
  const placementData = dummyEmployees.reduce((acc, emp) => {
    if (emp.status === "Eksis") {
      const region = emp.region_terakhir;
      if (!acc[region]) {
        acc[region] = { name: region, Eksis: 0 };
      }
      acc[region].Eksis += 1;
    }
    return acc;
  }, {});

  const data = Object.values(placementData);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Sebaran Staf Eksis (Region)</h3>
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
              <Bar dataKey="Eksis" fill="#2c8f42" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Belum ada data penempatan
          </div>
        )}
      </div>
    </div>
  );
}
