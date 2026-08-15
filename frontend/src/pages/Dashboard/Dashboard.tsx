import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatCard from "@/components/dashboard/StatCard";
import ProjectStatus from "@/components/dashboard/ProjectStatus";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AnalyticsChart from "@/components/dashboard/charts/AnalyticsChart";
import AIUsageChart from "@/components/dashboard/charts/AIUsageChart";

import {
  FolderKanban,
  MessageSquare,
  Activity,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div
      className="
        h-full
        w-full
        min-w-0
        overflow-y-auto
        overflow-x-hidden
        bg-primary
        text-primary
        scrollbar-thin
      "
    >
      <div className="space-y-8 p-6">

        {/* ==========================================
            WELCOME BANNER
        ========================================== */}

        <WelcomeBanner />

        {/* ==========================================
            STATISTICS
        ========================================== */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Projects"
            value="12"
            change="+2 this week"
            icon={FolderKanban}
          />

          <StatCard
            title="AI Requests"
            value="248"
            change="+15%"
            icon={Sparkles}
          />

          <StatCard
            title="Saved Chats"
            value="81"
            change="+8%"
            icon={MessageSquare}
          />

          <StatCard
            title="Productivity"
            value="96%"
            change="+5%"
            icon={Activity}
          />

        </div>

        {/* ==========================================
            ANALYTICS
        ========================================== */}

        <div className="grid gap-6 lg:grid-cols-2">

          <AnalyticsChart />

          <AIUsageChart />

        </div>

        {/* ==========================================
            PROJECT & QUICK ACTIONS
        ========================================== */}

        <div className="grid gap-6 lg:grid-cols-2">

          <ProjectStatus />

          <QuickActions />

        </div>

        {/* ==========================================
            RECENT ACTIVITY
        ========================================== */}

        <RecentActivity />

      </div>
    </div>
  );
};

export default Dashboard;