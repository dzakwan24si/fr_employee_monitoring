import { Search, Bell, HelpCircle, ChevronDown } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 bg-white rounded-[2rem] shadow-sm flex items-center justify-between px-6 shrink-0">
      {/* Logo Area */}
      <div className="flex items-center">
        <img src="/logofr.png" alt="FR Logo" className="h-8 w-auto mr-3" />
        <span className="font-bold text-gray-800 text-lg tracking-tight">FR Academy</span>
      </div>

      {/* Right Side (Search + Actions) */}
      <div className="flex flex-1 items-center justify-end gap-6">
        
        {/* Search Area */}
        <div className="hidden md:block w-full max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search employee"
              className="w-full bg-[#f8f9fa] border-none rounded-full py-2.5 pl-10 pr-12 text-sm text-gray-700 focus:ring-2 focus:ring-[#2c8f42] outline-none transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-[10px] text-gray-500 font-medium">
                Ctrl K
              </span>
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 transition-colors relative">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <HelpCircle size={20} strokeWidth={2} />
          </button>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 bg-[#eaf4ec] text-[#2c8f42] rounded-full flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div className="flex flex-col items-start hidden sm:flex">
            <span className="text-sm font-semibold text-gray-800 leading-tight">Admin FR</span>
            <span className="text-[10px] text-gray-500 leading-tight">Superadmin</span>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>

      </div>
    </header>
  );
}
