import type { ReactNode } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950">
      {/* Main Dashboard Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="shrink-0">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-hidden bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}