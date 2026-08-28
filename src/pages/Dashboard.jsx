import { SummaryCards } from "../components/Dashboard/SummaryCards";
import { TurnoverChart } from "../components/Dashboard/TurnoverChart";
import { PlacementChart } from "../components/Dashboard/PlacementChart";

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Analisa</h2>
        <p className="text-gray-500 mt-2">Ringkasan data karyawan dan performa retensi.</p>
      </div>
      
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurnoverChart />
        <PlacementChart />
      </div>
    </div>
  );
}
