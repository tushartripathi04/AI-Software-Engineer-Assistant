import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import Card from "@/components/common/Card";

const data = [
  { name: "Code", value: 42 },
  { name: "Review", value: 22 },
  { name: "Bug Fix", value: 18 },
  { name: "Docs", value: 18 },
];

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
];

export default function AIUsageChart() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold text-primary">
        AI Usage
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              outerRadius={90}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}