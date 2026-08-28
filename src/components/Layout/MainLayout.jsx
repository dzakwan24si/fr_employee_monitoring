import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-[#f4f6f8] p-4 gap-4 overflow-hidden">
      {/* Full Width Topbar Card */}
      <Topbar />
      
      {/* Bottom Area: Sidebar & Main Content */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Sidebar Card */}
        <div className="w-64 bg-white rounded-3xl shadow-sm shrink-0 overflow-hidden flex flex-col">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
