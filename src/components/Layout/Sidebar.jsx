import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserX, UserMinus, LogOut, Settings, HelpCircle } from "lucide-react";

export function Sidebar() {
  const mainNavItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard, badge: null },
    { name: "Staf Eksis", path: "/eksis", icon: Users, badge: "20" },
    { name: "Staf Terminate", path: "/terminate", icon: UserX, badge: null },
    { name: "Staf Culled", path: "/culled", icon: UserMinus, badge: null },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Menu
          </p>
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-medium ${
                      isActive
                        ? "bg-[#2c8f42] text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} strokeWidth={2} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#fdebe9] text-[#e35649] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            General
          </p>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all font-medium">
                <Settings size={20} strokeWidth={2} />
                <span>Settings</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all font-medium">
                <HelpCircle size={20} strokeWidth={2} />
                <span>Help Desk</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium">
          <LogOut size={20} strokeWidth={2} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
