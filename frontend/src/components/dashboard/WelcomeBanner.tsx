import { Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import AuthService from "../../services/auth.service";

const WelcomeBanner = () => {
  const {
    data: user,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: AuthService.getCurrentUser,
  });

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-[var(--accent)]
        p-8
        shadow-xl
        transition-colors duration-300
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80">
            Welcome back,
          </p>

          <h1 className="mt-2 text-5xl font-bold text-white">
            {isLoading
              ? "Loading..."
              : user?.full_name || "Developer"}{" "}
            👋
          </h1>

          <p className="mt-4 max-w-2xl text-white/80">
            Continue building your AI Software Engineer Assistant
            and track your development progress from one place.
          </p>
        </div>

        <div
          className="
            hidden
            rounded-full
            bg-white/10
            p-6
            backdrop-blur
            lg:block
          "
        >
          <Sparkles
            size={80}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;