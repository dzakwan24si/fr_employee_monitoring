import { Search, Bell, HelpCircle } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
      {/* Logo Area */}
      <div className="flex items-center gap-3">
        <img src="/logofr.png" alt="First Resources Logo" className="h-10 w-auto" />
      </div>

      {/* Search Area */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search employee..."
            className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-12 pr-12 text-sm text-gray-700 focus:ring-2 focus:ring-[#2c8f42] focus:bg-white outline-none transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-xs text-gray-400 font-medium bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
              Ctrl K
            </span>
          </div>
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <HelpCircle size={20} />
        </button>
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-100">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-800">Admin FR</span>
            <span className="text-xs text-gray-500">Superadmin</span>
          </div>
          <div className="h-10 w-10 bg-[#eaf4ec] text-[#2c8f42] rounded-full flex items-center justify-center font-bold text-lg">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
