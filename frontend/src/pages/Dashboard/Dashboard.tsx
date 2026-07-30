import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatCard from "@/components/dashboard/StatCard";
import ProjectStatus from "@/components/dashboard/ProjectStatus";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
// import DashboardLayout from "@/layouts/DashboardLayout";
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
    <div className="space-y-8">
      <WelcomeBanner />



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
      <div className="grid gap-6 lg:grid-cols-2">
  <AnalyticsChart />
  <AIUsageChart />
</div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectStatus />
        <QuickActions />
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;
