import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Card from "@/components/common/Card";

const data = [
  { day: "Mon", productivity: 25 },
  { day: "Tue", productivity: 45 },
  { day: "Wed", productivity: 35 },
  { day: "Thu", productivity: 60 },
  { day: "Fri", productivity: 75 },
  { day: "Sat", productivity: 55 },
  { day: "Sun", productivity: 82 },
];

export default function AnalyticsChart() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold text-primary">
        Weekly Productivity
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="var(--text-muted)"
            />

            <YAxis
              stroke="var(--text-muted)"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-primary)",
              }}
              labelStyle={{
                color: "var(--text-secondary)",
              }}
            />

            <Line
              type="monotone"
              dataKey="productivity"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#3B82F6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}