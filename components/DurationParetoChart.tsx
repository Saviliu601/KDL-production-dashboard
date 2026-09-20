"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface Props {
  data: {
    reason: string;
    value: number;
  }[];

  selectedReason: string | null;

  onSelectReason: (
    reason: string
  ) => void;
}

export default function DurationParetoChart({
  data,
  selectedReason,
  onSelectReason,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Duration Pareto
      </h2>

      <div className="overflow-x-auto">
        <div
          style={{
            width: `${Math.max(
              data.length * 70,
              1200
            )}px`,
            height: "450px",
          }}
        >
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis
                dataKey="reason"
                angle={-45}
                textAnchor="end"
                height={150}
              />

              <YAxis
                label={{
                  value:
                    "Downtime (Min)",
                  angle: -90,
                  position:
                    "insideLeft",
                }}
              />

              <Tooltip
                formatter={(value) => [
                  Number(value).toFixed(
                    1
                  ),
                  "Downtime (Min)",
                ]}
              />

              <Bar
                dataKey="value"
                onClick={(entry) =>
                  onSelectReason(
                    entry.reason
                  )
                }
              >
                {data.map((item) => (
                  <Cell
                    key={item.reason}
                    fill={
                      selectedReason ===
                      item.reason
                        ? "#dc2626"
                        : "#16a34a"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}