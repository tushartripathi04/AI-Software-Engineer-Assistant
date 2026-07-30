import Card from "@/components/common/Card";
import {
  CheckCircle2,
  GitPullRequest,
  FileCode2,
  Bug,
} from "lucide-react";

const activities = [
  {
    icon: CheckCircle2,
    title: "Authentication Module Completed",
    time: "2 hours ago",
  },
  {
    icon: GitPullRequest,
    title: "Repository Reviewed",
    time: "Yesterday",
  },
  {
    icon: FileCode2,
    title: "API Documentation Generated",
    time: "2 days ago",
  },
  {
    icon: Bug,
    title: "Login Bug Fixed",
    time: "3 days ago",
  },
];

export default function RecentActivity() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-blue-500"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-500/20 p-3">
                  <Icon
                    size={20}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="font-medium text-white">
                    {activity.title}
                  </p>

                  <p className="text-sm text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
                Success
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}