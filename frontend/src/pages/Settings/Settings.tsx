import { useEffect, useState } from "react";
import {
  Check,
  MonitorCog,
  Moon,
  Settings as SettingsIcon,
  Sun,
  User,
} from "lucide-react";

import AuthService from "../../services/auth.service";
import api from "../../lib/axios";

interface CurrentUser {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
}

type Theme = "dark" | "light";

export default function Settings() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ==========================================
  // LOAD CURRENT THEME
  // ==========================================

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.remove(
        "dark"
      );
    } else {
      setTheme("dark");
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  // ==========================================
  // GET CURRENT USER
  // ==========================================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = AuthService.getToken();

        if (!token) {
          return;
        }

        const response =
          await api.get<CurrentUser>("/users/me");

        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch current user:",
          error
        );
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // ==========================================
  // CHANGE THEME
  // ==========================================

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem("theme", "light");
    }
  };

  // ==========================================
  // USER DISPLAY
  // ==========================================

  const displayName =
    user?.full_name || "Developer";

  const avatarLetter = displayName
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div
      className="
        h-full
        w-full
        overflow-y-auto
        bg-primary
        text-primary
      "
    >
      <div
        className="
          mx-auto
          max-w-5xl
          space-y-6
          p-6
          lg:p-8
        "
      >
        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div
          className="
            border-b
            border-theme
            pb-6
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-xl
                border
                border-[#d4a72c]/20
                bg-[#1b1810]
              "
            >
              <SettingsIcon
                size={23}
                strokeWidth={1.8}
                className="text-[#d4a72c]"
              />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-primary
                "
              >
                Settings
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-secondary
                "
              >
                Manage your workspace preferences
                and application settings.
              </p>
            </div>

          </div>
        </div>

        {/* ==========================================
            APPEARANCE
        ========================================== */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border
            border-theme
            bg-secondary
          "
        >
          <div
            className="
              border-b
              border-theme
              px-6
              py-5
            "
          >
            <div className="flex items-center gap-3">

              <MonitorCog
                size={19}
                strokeWidth={1.8}
                className="text-[#d4a72c]"
              />

              <div>
                <h2
                  className="
                    text-base
                    font-semibold
                    text-primary
                  "
                >
                  Appearance
                </h2>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-muted
                  "
                >
                  Customize how the engineering
                  workspace looks.
                </p>
              </div>

            </div>
          </div>

          <div className="p-6">

            <div className="mb-4">
              <h3
                className="
                  text-sm
                  font-medium
                  text-primary
                "
              >
                Theme
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-muted
                "
              >
                Select your preferred workspace
                appearance.
              </p>
            </div>

            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              {/* DARK MODE */}

              <button
                type="button"
                onClick={() =>
                  changeTheme("dark")
                }
                className={`
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  border
                  p-4
                  text-left
                  transition-all
                  ${
                    theme === "dark"
                      ? `
                        border-[#d4a72c]/60
                        bg-[#1b1810]
                      `
                      : `
                        border-theme
                        bg-input
                        hover:border-[#d4a72c]/30
                      `
                  }
                `}
              >
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-lg
                    border
                    border-theme
                    bg-tertiary
                  "
                >
                  <Moon
                    size={19}
                    strokeWidth={1.8}
                    className={
                      theme === "dark"
                        ? "text-[#d4a72c]"
                        : "text-secondary"
                    }
                  />
                </div>

                <div className="flex-1">
                  <p
                    className="
                      text-sm
                      font-medium
                      text-primary
                    "
                  >
                    Dark
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-muted
                    "
                  >
                    Recommended for engineering work
                  </p>
                </div>

                {theme === "dark" && (
                  <div
                    className="
                      flex h-6 w-6
                      items-center justify-center
                      rounded-full
                      bg-[#d4a72c]
                    "
                  >
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="text-[#17130a]"
                    />
                  </div>
                )}
              </button>

              {/* LIGHT MODE */}

              <button
                type="button"
                onClick={() =>
                  changeTheme("light")
                }
                className={`
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  border
                  p-4
                  text-left
                  transition-all
                  ${
                    theme === "light"
                      ? `
                        border-[#d4a72c]/60
                        bg-[#fffaf0]
                      `
                      : `
                        border-theme
                        bg-input
                        hover:border-[#d4a72c]/30
                      `
                  }
                `}
              >
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-lg
                    border
                    border-theme
                    bg-tertiary
                  "
                >
                  <Sun
                    size={19}
                    strokeWidth={1.8}
                    className={
                      theme === "light"
                        ? "text-[#b88d1f]"
                        : "text-secondary"
                    }
                  />
                </div>

                <div className="flex-1">
                  <p
                    className="
                      text-sm
                      font-medium
                      text-primary
                    "
                  >
                    Light
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-muted
                    "
                  >
                    Clean and bright workspace
                  </p>
                </div>

                {theme === "light" && (
                  <div
                    className="
                      flex h-6 w-6
                      items-center justify-center
                      rounded-full
                      bg-[#d4a72c]
                    "
                  >
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="text-[#17130a]"
                    />
                  </div>
                )}
              </button>
            </div>

          </div>
        </section>

        {/* ==========================================
            ACCOUNT
        ========================================== */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border
            border-theme
            bg-secondary
          "
        >
          <div
            className="
              border-b
              border-theme
              px-6
              py-5
            "
          >
            <div className="flex items-center gap-3">

              <User
                size={19}
                strokeWidth={1.8}
                className="text-[#d4a72c]"
              />

              <div>
                <h2
                  className="
                    text-base
                    font-semibold
                    text-primary
                  "
                >
                  Account
                </h2>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-muted
                  "
                >
                  Your developer account information.
                </p>
              </div>

            </div>
          </div>

          <div className="p-6">

            {loadingUser ? (
              <div className="space-y-4">

                <div
                  className="
                    h-14
                    animate-pulse
                    rounded-xl
                    bg-tertiary
                  "
                />

                <div
                  className="
                    h-14
                    animate-pulse
                    rounded-xl
                    bg-tertiary
                  "
                />

              </div>
            ) : (
              <div className="space-y-4">

                {/* NAME */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    border
                    border-theme
                    bg-input
                    p-4
                  "
                >
                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-lg
                      border
                      border-[#d4a72c]/30
                      bg-[#1b1810]
                      text-sm
                      font-semibold
                      text-[#d4a72c]
                    "
                  >
                    {avatarLetter}
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        text-muted
                      "
                    >
                      Full Name
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-medium
                        text-primary
                      "
                    >
                      {displayName}
                    </p>
                  </div>
                </div>

                {/* EMAIL */}

                <div
                  className="
                    rounded-xl
                    border
                    border-theme
                    bg-input
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-medium
                      text-primary
                    "
                  >
                    {user?.email || "Not available"}
                  </p>
                </div>

                {/* STATUS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-theme
                    bg-input
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-muted
                    "
                  >
                    Account Status
                  </p>

                  <div className="mt-2 flex items-center gap-2">

                    <span
                      className={`
                        h-2
                        w-2
                        rounded-full
                        ${
                          user?.is_active
                            ? "bg-[#d4a72c]"
                            : "bg-red-500"
                        }
                      `}
                    />

                    <span
                      className="
                        text-sm
                        font-medium
                        text-primary
                      "
                    >
                      {user?.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* ==========================================
            APPLICATION
        ========================================== */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border
            border-theme
            bg-secondary
          "
        >
          <div
            className="
              border-b
              border-theme
              px-6
              py-5
            "
          >
            <h2
              className="
                text-base
                font-semibold
                text-primary
              "
            >
              Application
            </h2>

            <p
              className="
                mt-0.5
                text-xs
                text-muted
              "
            >
              Platform information.
            </p>
          </div>

          <div className="p-6">

            <div
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-theme
                bg-input
                p-4
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-primary
                  "
                >
                  AI Software Engineering Assistant
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-muted
                  "
                >
                  Developer Engineering Platform
                </p>
              </div>

              <span
                className="
                  rounded-md
                  border
                  border-theme
                  bg-tertiary
                  px-2
                  py-1
                  text-[10px]
                  font-medium
                  text-muted
                "
              >
                v1.0.0
              </span>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}