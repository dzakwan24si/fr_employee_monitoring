import { Users, UserX, UserMinus } from "lucide-react";
import { dummyEmployees } from "../../data/dummyEmployees";

export function SummaryCards() {
  const eksisCount = dummyEmployees.filter((e) => e.status === "Eksis").length;
  const terminateCount = dummyEmployees.filter((e) => e.status === "Terminate").length;
  const culledCount = dummyEmployees.filter((e) => e.status === "Culled").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-4 bg-[#eaf4ec] text-[#2c8f42] rounded-lg">
          <Users size={32} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Staf Eksis</p>
          <p className="text-3xl font-bold text-gray-800">{eksisCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          <UserX size={32} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Terminate</p>
          <p className="text-3xl font-bold text-gray-800">{terminateCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-4 bg-orange-50 text-orange-600 rounded-lg">
          <UserMinus size={32} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Culled</p>
          <p className="text-3xl font-bold text-gray-800">{culledCount}</p>
        </div>
      </div>
    </div>
  );
}
