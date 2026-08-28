import { CalendarDays, ChevronDown } from "lucide-react";
import { SummaryCards } from "../components/Dashboard/SummaryCards";
import { TurnoverChart } from "../components/Dashboard/TurnoverChart";
import { PlacementChart } from "../components/Dashboard/PlacementChart";
import { dummyEmployees } from "../data/dummyEmployees";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee Overview</h2>
        
        {/* Dummy Date Picker */}
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <CalendarDays size={18} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Jan 01, 2026 - Dec 31, 2026</span>
          <ChevronDown size={16} className="text-gray-400 ml-2" />
        </button>
      </div>
      
      {/* Cards */}
      <SummaryCards />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurnoverChart />
        <PlacementChart />
      </div>

      {/* Recent Updates Preview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Recent Updates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium rounded-tl-lg">NIK</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium rounded-tr-lg">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dummyEmployees.slice(0, 4).map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-900">{emp.nik}</td>
                  <td className="p-4 text-sm text-gray-700">{emp.nama}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      emp.status === "Eksis" ? "bg-[#eaf4ec] text-[#2c8f42]" :
                      emp.status === "Terminate" ? "bg-red-50 text-red-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{emp.jabatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
