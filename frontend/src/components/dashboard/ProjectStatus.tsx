import Card from "@/components/common/Card";
import { FolderGit2 } from "lucide-react";

export default function ProjectStatus() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-500/20 p-3">
          <FolderGit2 className="text-blue-400" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Current Project
          </h2>

          <p className="text-sm text-slate-400">
            Active Development
          </p>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-white">
          AI Software Engineer Assistant
        </span>

        <span className="font-bold text-blue-400">
          70%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
      </div>

      <p className="mt-5 text-sm text-slate-400">
        Frontend development is progressing well. Authentication,
        dashboard, routing and analytics modules are complete.
      </p>
    </Card>
  );
}