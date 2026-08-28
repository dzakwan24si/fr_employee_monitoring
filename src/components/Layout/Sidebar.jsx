import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserX, UserMinus } from "lucide-react";

export function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Staf Eksis", path: "/eksis", icon: Users },
    { name: "Staf Terminate", path: "/terminate", icon: UserX },
    { name: "Staf Culled", path: "/culled", icon: UserMinus },
  ];

  return (
    <aside className="w-64 bg-[#0a4239] text-white flex flex-col min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center tracking-tight">
          FR Academy
        </h1>
        <p className="text-sm text-center text-gray-300 mt-1">
          Employee Dashboard
        </p>
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#2c8f42] text-white font-medium"
                      : "text-gray-300 hover:bg-[#083029] hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 text-xs text-center text-gray-400">
        &copy; {new Date().getFullYear()} First Resources
      </div>
    </aside>
  );
}
