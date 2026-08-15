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
  FolderSearch,
  GitBranch,
  Briefcase,
  Gauge,
  Settings,
  Terminal,
} from "lucide-react";

const menuGroups = [
  {
    title: "WORKSPACE",
    items: [
      {
        name: "Overview",
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
    title: "BUILD",
    items: [
      {
        name: "Code Generator",
        path: "/code-generator",
        icon: Code2,
      },
      {
        name: "Code Explainer",
        path: "/code-explainer",
        icon: Terminal,
      },
      {
        name: "Complexity Analyzer",
        path: "/complexity",
        icon: Gauge,
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
        name: "Test Case Generator",
        path: "/test-cases",
        icon: TestTube2,
      },
    ],
  },

  {
    title: "ENGINEERING",
    items: [
      {
        name: "Documentation",
        path: "/documentation",
        icon: FileText,
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
      {
        name: "Project Analyzer",
        path: "/project-analyzer",
        icon: FolderSearch,
      },
      {
        name: "Git Assistant",
        path: "/git-assistant",
        icon: GitBranch,
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
    <aside
      className="
        flex h-screen w-72 shrink-0 flex-col
        border-r border-theme
        bg-primary
        transition-colors duration-300
      "
    >
      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <div className="flex-1 overflow-y-auto px-4 py-6">

        {menuGroups.map((group) => (
          <div
            key={group.title}
            className="mb-8"
          >

            {/* Section Title */}

            <h3
              className="
                mb-3 px-3
                text-[10px]
                font-semibold
                tracking-[0.18em]
                text-muted
              "
            >
              {group.title}
            </h3>

            {/* Menu Items */}

            <div className="space-y-1">

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                        group relative
                        flex items-center gap-3
                        rounded-lg
                        px-3 py-2.5
                        text-sm font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-tertiary text-primary"
                            : "text-secondary hover:bg-tertiary hover:text-primary"
                        }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active indicator */}

                        <span
                          className={`
                            absolute left-0
                            h-5 w-[2px]
                            rounded-full
                            bg-accent
                            transition-opacity
                            ${
                              isActive
                                ? "opacity-100"
                                : "opacity-0"
                            }
                          `}
                        />

                        {/* Icon */}

                        <Icon
                          size={18}
                          strokeWidth={1.8}
                          className={`
                            shrink-0
                            transition-colors
                            ${
                              isActive
                                ? "text-accent"
                                : "text-secondary group-hover:text-accent"
                            }
                          `}
                        />

                        {/* Label */}

                        <span className="truncate">
                          {item.name}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}

            </div>
          </div>
        ))}

      </div>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <div className="border-t border-theme px-5 py-4">

        <div className="flex items-center justify-end">

          <span
            className="
              rounded-md
              border border-theme
              bg-tertiary
              px-2 py-1
              text-[9px]
              font-medium
              text-muted
            "
          >
            v1.0.0
          </span>

        </div>

      </div>
    </aside>
  );
}