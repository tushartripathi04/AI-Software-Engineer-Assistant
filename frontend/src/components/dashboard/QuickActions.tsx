import Card from "@/components/common/Card";
import {
  Code2,
  Bug,
  FileText,
  SearchCheck,
} from "lucide-react";

const actions = [
  {
    title: "Generate Code",
    icon: Code2,
  },
  {
    title: "Review Code",
    icon: SearchCheck,
  },
  {
    title: "Fix Bugs",
    icon: Bug,
  },
  {
    title: "Documentation",
    icon: FileText,
  },
];

export default function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="group rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:border-blue-500 hover:bg-slate-800"
            >
              <Icon
                size={28}
                className="mx-auto mb-3 text-blue-400 transition-transform group-hover:scale-110"
              />

              <p className="text-sm font-medium text-white">
                {action.title}
              </p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}