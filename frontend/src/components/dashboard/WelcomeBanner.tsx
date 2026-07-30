import { Sparkles } from "lucide-react";

const WelcomeBanner = () => {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100">
            Welcome back,
          </p>

          <h1 className="mt-2 text-5xl font-bold text-white">
            Tushar 👋
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100">
            Continue building your AI Software Engineer Assistant
            and track your development progress from one place.
          </p>
        </div>

        <div className="hidden rounded-full bg-white/10 p-6 backdrop-blur lg:block">
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