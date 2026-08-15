import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Card from "@/components/common/Card";

interface Props {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
}: Props) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          {/* Title */}
          <p className="text-sm text-secondary">
            {title}
          </p>

          {/* Value */}
          <h2
            className="
              mt-4
              text-4xl
              font-bold
              text-primary
            "
          >
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className="
            rounded-xl
            bg-blue-500/10
            p-3
          "
        >
          <Icon
            size={28}
            className="text-blue-500"
          />
        </div>
      </div>

      {/* Change */}
      <div className="mt-6 flex items-center gap-2">
        <TrendingUp
          size={18}
          className="text-emerald-500"
        />

        <span className="text-sm text-emerald-500">
          {change}
        </span>
      </div>
    </Card>
  );
};

export default StatCard;