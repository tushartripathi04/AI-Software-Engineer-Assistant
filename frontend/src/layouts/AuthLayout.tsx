import  type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            AI Software Engineer Assistant
          </h1>

          <p className="text-slate-400 mt-2">
            Intelligent Development Platform
          </p>

        </div>

        <div className="mb-6">

          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            {subtitle}
          </p>

        </div>

        {children}

      </motion.div>

    </div>
  );
}