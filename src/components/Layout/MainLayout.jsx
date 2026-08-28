import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f5f7fa]">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
