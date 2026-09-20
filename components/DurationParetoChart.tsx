"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  Cell,
} from "recharts";

interface Props {
  data: {
    reason: string;
    value: number;
  }[];

  selectedReason: string | null;

  mode:
    | "TOP20"
    | "TOP50"
    | "ALL";

  onModeChange: (
    mode:
      | "TOP20"
      | "TOP50"
      | "ALL"
  ) => void;

  onSelectReason: (
    reason: string
  ) => void;
}

export default function DurationParetoChart({
  data,
  selectedReason,
  mode,
  onModeChange,
  onSelectReason,
}: Props) {

  const total =
    data.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );

  let running = 0;

  const chartData =
    data.map((item) => {

      running += item.value;

      return {
        ...item,

        cumulative:
          total > 0
            ? (
                running /
                total
              ) *
              100
            : 0,
      };

    });

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Duration Pareto
        </h2>

        <select
          value={mode}
          onChange={(e) =>
            onModeChange(
              e.target.value as
                | "TOP20"
                | "TOP50"
                | "ALL"
            )
          }
          className="border rounded px-2 py-1"
        >
          <option value="TOP20">
            TOP20
          </option>

          <option value="TOP50">
            TOP50
          </option>

          <option value="ALL">
            ALL
          </option>

        </select>

      </div>

      <div className="overflow-x-auto">

        <div
          style={{
            width: `${Math.max(
              chartData.length *
                70,
              1200
            )}px`,
            height: "450px",
          }}
        >

          <ResponsiveContainer>

            <ComposedChart
              data={chartData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="reason"
                angle={-45}
                textAnchor="end"
                height={150}
              />

              <YAxis
                yAxisId="duration"
                label={{
                  value:
                    "Downtime (Min)",
                  angle: -90,
                  position:
                    "insideLeft",
                }}
              />

              <YAxis
                yAxisId="percent"
                orientation="right"
                domain={[0, 100]}
                tickFormatter={(v) =>
                  `${v}%`
                }
              />

              <Tooltip />

              <Legend />

              <Bar
                yAxisId="duration"
                dataKey="value"
                name="Downtime"
              >
                {chartData.map(
                  (item) => (
                    <Cell
                      key={item.reason}
                      fill={
                        selectedReason ===
                        item.reason
                          ? "#dc2626"
                          : "#16a34a"
                      }
                      onClick={() =>
                        onSelectReason(
                          item.reason
                        )
                      }
                    />
                  )
                )}
              </Bar>

              <Line
                yAxisId="percent"
                dataKey="cumulative"
                name="Cumulative %"
                stroke="#f59e0b"
                strokeWidth={3}
                dot
              />

            </ComposedChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}