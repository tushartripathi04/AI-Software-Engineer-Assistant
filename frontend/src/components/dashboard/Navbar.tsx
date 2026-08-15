import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Moon,
  Sun,
  Settings,
  ChevronDown,
  LogOut,
  Check,
  Bot,
  Code2,
  Bug,
  FileText,
  Database,
  TestTube2,
  GitBranch,
  Briefcase,
  Gauge,
  X,
} from "lucide-react";

import AuthService from "../../services/auth.service";
import api from "../../lib/axios";

interface CurrentUser {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
}

interface Tool {
  name: string;
  path: string;
  icon: React.ElementType;
  category: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ElementType;
}

const tools: Tool[] = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: Gauge,
    category: "Workspace",
  },
  {
    name: "AI Chat",
    path: "/chat",
    icon: Bot,
    category: "Workspace",
  },
  {
    name: "Code Generator",
    path: "/code-generator",
    icon: Code2,
    category: "Build",
  },
  {
    name: "Code Explainer",
    path: "/code-explainer",
    icon: Code2,
    category: "Build",
  },
  {
    name: "Complexity Analyzer",
    path: "/complexity",
    icon: Gauge,
    category: "Build",
  },
  {
    name: "Code Reviewer",
    path: "/code-reviewer",
    icon: Code2,
    category: "Build",
  },
  {
    name: "Bug Fixer",
    path: "/bug-fixer",
    icon: Bug,
    category: "Build",
  },
  {
    name: "Test Case Generator",
    path: "/test-cases",
    icon: TestTube2,
    category: "Build",
  },
  {
    name: "Documentation",
    path: "/documentation",
    icon: FileText,
    category: "Engineering",
  },
  {
    name: "SQL Generator",
    path: "/sql-generator",
    icon: Database,
    category: "Engineering",
  },
  {
    name: "API Generator",
    path: "/api-generator",
    icon: Code2,
    category: "Engineering",
  },
  {
    name: "Diagram Generator",
    path: "/diagram-generator",
    icon: GitBranch,
    category: "Engineering",
  },
  {
    name: "README Generator",
    path: "/readme-generator",
    icon: FileText,
    category: "Engineering",
  },
  {
    name: "Project Analyzer",
    path: "/project-analyzer",
    icon: Code2,
    category: "Engineering",
  },
  {
    name: "Git Assistant",
    path: "/git-assistant",
    icon: GitBranch,
    category: "Engineering",
  },
  {
    name: "Resume Generator",
    path: "/resume",
    icon: FileText,
    category: "Career",
  },
  {
    name: "Interview Assistant",
    path: "/interview",
    icon: Briefcase,
    category: "Career",
  },
];

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Welcome to your workspace",
    message: "Your AI Software Engineer Assistant is ready.",
    time: "Just now",
    read: false,
    icon: Bot,
  },
  {
    id: 2,
    title: "AI tools available",
    message: "Explore Code Generator and Code Reviewer.",
    time: "5 min ago",
    read: false,
    icon: Code2,
  },
  {
    id: 3,
    title: "Workspace updated",
    message: "Your engineering workspace is up to date.",
    time: "1 hour ago",
    read: true,
    icon: Check,
  },
];

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState<CurrentUser | null>(null);

  // ==========================================
  // THEME
  // ==========================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  // ==========================================
  // SEARCH
  // ==========================================

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications
  );

  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef<HTMLDivElement | null>(null);

  // ==========================================
  // GET CURRENT USER
  // ==========================================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = AuthService.getToken();

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get<CurrentUser>("/users/me");

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);

        AuthService.logout();
        navigate("/login");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  // ==========================================
  // APPLY THEME
  // ==========================================

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ==========================================
  // KEYBOARD SHORTCUT
  // ==========================================

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();

        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        setShowSearchResults(false);
        setShowNotifications(false);
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  // ==========================================
  // CLOSE DROPDOWNS ON OUTSIDE CLICK
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setShowSearchResults(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // TOGGLE THEME
  // ==========================================

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredTools = tools.filter((tool) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return false;
    }

    return (
      tool.name.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  });

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setSearchQuery(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const handleToolSelect = (path: string) => {
    setSearchQuery("");
    setShowSearchResults(false);

    navigate(path);
  };

  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotificationToggle = () => {
    setShowNotifications((current) => !current);

    setShowSearchResults(false);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    AuthService.logout();
    navigate("/login");
  };

  // ==========================================
  // USER DISPLAY DATA
  // ==========================================

  const displayName = user?.full_name || "User";

  const avatarLetter = displayName
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <header
      className="
        sticky top-0 z-30
        flex h-20 shrink-0
        items-center justify-between
        border-b border-theme
        bg-secondary
        px-8
        backdrop-blur-xl
        transition-colors duration-300
      "
    >
      {/* ==========================================
          LEFT — PAGE IDENTITY
      ========================================== */}

      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className="hidden h-8 w-px bg-theme sm:block" />

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-primary">
              Engineering Workspace
            </h1>

            <p className="mt-0.5 text-xs text-secondary">
              Build, analyze and improve your software
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          RIGHT — ACTIONS
      ========================================== */}

      <div className="flex items-center gap-3">

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div
          ref={searchRef}
          className="relative hidden xl:block"
        >
          <Search
            size={16}
            strokeWidth={1.8}
            className="
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-muted
            "
          />

          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (searchQuery.trim()) {
                setShowSearchResults(true);
              }
            }}
            placeholder="Search tools..."
            aria-label="Search tools"
            className="
              h-10 w-64
              rounded-lg
              border border-theme
              bg-input
              pl-10 pr-10
              text-sm text-primary
              placeholder:text-muted
              outline-none
              transition-all
              focus:border-accent
              focus:ring-1
              focus:ring-accent/20
            "
          />

          {searchQuery ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
                searchInputRef.current?.focus();
              }}
              className="
                absolute right-3
                top-1/2
                -translate-y-1/2
                text-muted
                transition-colors
                hover:text-accent
              "
            >
              <X size={14} />
            </button>
          ) : (
            <span
              className="
                absolute right-3
                top-1/2
                hidden
                -translate-y-1/2
                rounded
                border border-theme
                bg-tertiary
                px-1.5 py-0.5
                text-[9px]
                text-muted
                2xl:block
              "
            >
              /
            </span>
          )}

          {/* SEARCH RESULTS */}

          {showSearchResults && (
            <div
              className="
                absolute right-0 top-12
                z-50
                w-80
                overflow-hidden
                rounded-xl
                border border-theme
                bg-secondary
                shadow-2xl
              "
            >
              <div className="border-b border-theme px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Search Results
                </p>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => {
                    const Icon = tool.icon;

                    return (
                      <button
                        key={tool.path}
                        type="button"
                        onClick={() =>
                          handleToolSelect(tool.path)
                        }
                        className="
                          group
                          flex w-full
                          items-center gap-3
                          rounded-lg
                          px-3 py-2.5
                          text-left
                          transition-colors
                          hover:bg-tertiary
                        "
                      >
                        <div
                          className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-accent-soft
                            text-accent
                          "
                        >
                          <Icon size={16} strokeWidth={1.8} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-primary">
                            {tool.name}
                          </p>

                          <p className="text-[10px] text-muted">
                            {tool.category}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search
                      size={24}
                      className="mx-auto mb-2 text-muted"
                    />

                    <p className="text-sm text-secondary">
                      No tools found
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      Try another search term
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            NOTIFICATIONS
        ========================================== */}

        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            onClick={handleNotificationToggle}
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-theme
              bg-input
              text-secondary
              transition-all
              hover:border-accent
              hover:text-accent
            "
          >
            <Bell size={17} strokeWidth={1.8} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute right-2.5 top-2.5
                  h-1.5 w-1.5
                  rounded-full
                  bg-accent
                "
              />
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}

          {showNotifications && (
            <div
              className="
                absolute right-0 top-12
                z-50
                w-96
                overflow-hidden
                rounded-xl
                border border-theme
                bg-secondary
                shadow-2xl
              "
            >
              {/* Header */}

              <div className="flex items-center justify-between border-b border-theme px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold text-primary">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-[10px] text-muted">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1 ? "s" : ""
                        }`
                      : "You're all caught up"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="
                      flex items-center gap-1.5
                      rounded-md
                      px-2 py-1
                      text-[10px]
                      font-medium
                      text-accent
                      transition-colors
                      hover:bg-accent-soft
                    "
                  >
                    <Check size={13} />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notifications */}

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => {
                    const Icon = notification.icon;

                    return (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          markNotificationAsRead(
                            notification.id
                          )
                        }
                        className={`
                          flex w-full
                          gap-3
                          border-b border-theme
                          px-4 py-4
                          text-left
                          transition-colors
                          hover:bg-tertiary
                          ${
                            !notification.read
                              ? "bg-accent-soft/30"
                              : ""
                          }
                        `}
                      >
                        <div
                          className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-accent-soft
                            text-accent
                          "
                        >
                          <Icon
                            size={16}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-primary">
                              {notification.title}
                            </p>

                            {!notification.read && (
                              <span
                                className="
                                  mt-1
                                  h-1.5 w-1.5
                                  shrink-0
                                  rounded-full
                                  bg-accent
                                "
                              />
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-secondary">
                            {notification.message}
                          </p>

                          <p className="mt-1.5 text-[10px] text-muted">
                            {notification.time}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-10 text-center">
                    <Bell
                      size={28}
                      className="mx-auto mb-3 text-muted"
                    />

                    <p className="text-sm text-secondary">
                      No notifications
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            THEME TOGGLE
        ========================================== */}

        <button
          type="button"
          aria-label={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          onClick={toggleTheme}
          className="
            group
            flex h-10 w-10
            items-center justify-center
            rounded-lg
            border border-theme
            bg-input
            text-secondary
            transition-all duration-200
            hover:border-accent
            hover:bg-tertiary
            hover:text-accent
          "
        >
          {darkMode ? (
            <Sun
              size={18}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:rotate-12
              "
            />
          ) : (
            <Moon
              size={18}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:-rotate-12
              "
            />
          )}
        </button>

        {/* ==========================================
            SETTINGS
        ========================================== */}

        <button
          type="button"
          aria-label="Settings"
          onClick={() => navigate("/settings")}
          className="
            hidden h-10 w-10
            items-center justify-center
            rounded-lg
            border border-theme
            bg-input
            text-secondary
            transition-all
            hover:border-accent
            hover:bg-tertiary
            hover:text-accent
            md:flex
          "
        >
          <Settings size={17} strokeWidth={1.8} />
        </button>

        {/* ==========================================
            PROFILE
        ========================================== */}

        <button
          type="button"
          className="
            flex items-center gap-3
            rounded-lg
            border border-theme
            bg-input
            px-2.5 py-1.5
            transition-all
            hover:border-accent
            hover:bg-tertiary
          "
        >
          <div
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-md
              border border-accent/30
              bg-accent-soft
              text-sm font-semibold
              text-accent
            "
          >
            {avatarLetter}
          </div>

          <div className="hidden text-left lg:block">
            <p className="max-w-[180px] truncate text-sm font-medium text-primary">
              {displayName}
            </p>

            <p className="text-[10px] text-muted">
              Developer
            </p>
          </div>

          <ChevronDown
            size={15}
            strokeWidth={1.8}
            className="text-muted"
          />
        </button>

        {/* ==========================================
            LOGOUT
        ========================================== */}

        <button
          type="button"
          onClick={logout}
          className="
            flex h-10
            items-center gap-2
            rounded-lg
            border border-danger-border
            bg-danger-soft
            px-3.5
            text-sm font-medium
            text-danger
            transition-all
            hover:border-danger
            hover:bg-danger-hover
          "
        >
          <LogOut size={16} strokeWidth={1.8} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}