import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl",

        // Theme-aware border and background
        "border border-slate-200",
        "bg-[var(--bg-primary)]",

        // Appearance
        "shadow-lg",
        "transition-all",
        "duration-300",

        // Hover
        "hover:-translate-y-1",
        "hover:scale-[1.01]",
        "hover:border-blue-400",
        "hover:shadow-xl",

        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;