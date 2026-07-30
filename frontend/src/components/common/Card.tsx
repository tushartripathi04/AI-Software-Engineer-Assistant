import { ReactNode } from "react";
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
        "border border-slate-800",
        "bg-slate-900/70",
        "backdrop-blur-xl",
        "shadow-xl",
        "transition-all",
        "duration-300",
        "hover:-translate-y-2",
        "hover:scale-[1.02]",
        "hover:border-blue-500/40",
        "hover:shadow-2xl",
        "hover:shadow-blue-500/10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;