// import AuthService from "../../services/auth.service";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     AuthService.logout();
//     navigate("/login");
//   };

//   return (
//     <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
//       <h2 className="text-xl font-semibold text-white">
//         Dashboard
//       </h2>

//       <button
//         onClick={logout}
//         className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
//       >
//         Logout
//       </button>
//     </header>
//   );
// }


import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Moon,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";

import AuthService from "../../services/auth.service";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 backdrop-blur-xl">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-400">
          AI Software Engineer Assistant
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:bg-slate-800">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Theme Button (placeholder) */}
        <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:bg-slate-105">
          <Moon size={18} />
        </button>

        {/* Settings */}
        <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:bg-slate-95">
          <Settings size={18} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-lg font-bold text-white">
            T
          </div>

          <div className="hidden xl:block">
            <p className="font-medium text-white">
              Tushar
            </p>

            <p className="text-xs text-slate-400">
              Software Engineer
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-slate-400"
          />
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-700"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>
    </header>
  );
}