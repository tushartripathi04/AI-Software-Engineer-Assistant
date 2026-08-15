import type { ReactNode } from "react";
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
    <div
      className="
        min-h-screen
        bg-primary
        text-primary
        flex
        items-center
        justify-center
        px-6
        py-10
        transition-colors
        duration-300
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-theme
          bg-secondary
          p-8
          shadow-2xl
          transition-colors
          duration-300
        "
      >
        {/* Project Branding */}
        <div className="mb-8 text-center">
          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              text-primary
            "
          >
            AI Software Engineer
            <br />
            Assistant
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-secondary
            "
          >
            Intelligent Development Platform
          </p>
        </div>

        {/* Page Heading */}
        <div className="mb-6">
          <h2
            className="
              text-2xl
              font-semibold
              text-primary
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-secondary
            "
          >
            {subtitle}
          </p>
        </div>

        {children}
      </motion.div>
    </div>
  );
}