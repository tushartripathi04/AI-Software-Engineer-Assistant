import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Bot,
  Code2,
  SearchCheck,
  Bug,
  FileText,
  Database,
  TestTube2,
  ServerCog,
  FileBadge,
  GitBranch,
  Briefcase,
  Settings,
  Sparkles,
} from "lucide-react";

const menuGroups = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "AI Chat",
        path: "/chat",
        icon: Bot,
      },
    ],
  },

  {
    title: "AI TOOLS",
    items: [
      {
        name: "Code Generator",
        path: "/code-generator",
        icon: Code2,
      },
      {
        name: "Code Reviewer",
        path: "/code-reviewer",
        icon: SearchCheck,
      },
      {
        name: "Bug Fixer",
        path: "/bug-fixer",
        icon: Bug,
      },
      {
        name: "Documentation",
        path: "/documentation",
        icon: FileText,
      },
      {
        name: "Test Case Generator",
        path: "/test-cases",
        icon: TestTube2,
      },
      {
        name: "SQL Generator",
        path: "/sql-generator",
        icon: Database,
      },
      {
         name: "API Generator",
         path: "/api-generator",
         icon: ServerCog,
        },
        {
          name: "Diagram Generator",
          path: "/diagram-generator",
          icon: GitBranch,
        },
        {
           name: "README Generator",
           path: "/readme-generator",
           icon: FileText,
       },
    ],
  },

  {
    title: "CAREER",
    items: [
      {
        name: "Resume Generator",
        path: "/resume",
        icon: FileBadge,
      },
      {
        name: "Interview Assistant",
        path: "/interview",
        icon: Briefcase,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        name: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <div className="mb-4 flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 p-3">

            <Sparkles
              size={22}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-lg font-bold text-white">
              AI Software Engineer
            </h1>

            <p className="text-sm text-slate-400">
              Personal Coding Copilot
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

     <div
  className="
    flex-1
    overflow-y-auto
    px-4
    py-6
    scrollbar-thin
  "
>

        {menuGroups.map((group) => (
          <div
            key={group.title}
            className="mb-10"
          >
            <h3 className="mb-3 px-3 text-xs font-semibold tracking-widest text-slate-500 uppercase">
              {group.title}
            </h3>

            <div className="space-y-2">

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }
                      `
                    }
                  >
                    <Icon
                      size={20}
                      className="transition-transform group-hover:scale-110"
                    />

                    <span className="text-sm font-medium">
                      {item.name}
                    </span>

                    {(item.name === "Resume Generator" ||
                      item.name === "Interview Assistant") && (
                      <span className="ml-auto rounded-full bg-violet-500/20 px-2 py-1 text-[10px] text-violet-300">
                        Soon
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <p className="text-xs text-slate-500">
          AI Software Engineer Assistant
        </p>

        <p className="mt-1 text-xs text-slate-600">
          Version 1.0.0
        </p>

      </div>

    </aside>
  );
}