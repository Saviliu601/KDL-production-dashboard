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

  mode:
    | "TOP20"
    | "TOP50"
    | "ALL";

  onSelectReason: (
    reason: string
  ) => void;
}

export default function DurationParetoChart({
  data,
  selectedReason,
  mode,
  onSelectReason,
}: Props) {

  const displayData =
    mode === "TOP20"
      ? data.slice(0, 20)
      : mode === "TOP50"
      ? data.slice(0, 50)
      : data;

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Duration Pareto
      </h2>

      <div className="overflow-x-auto">

        <div
          style={{
            width: `${Math.max(
              displayData.length *
                70,
              1200
            )}px`,
            height: "450px",
          }}
        >

          <ResponsiveContainer>

            <BarChart
              data={displayData}
            >

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

              <Tooltip />

              <Bar
                dataKey="value"
              >
                {displayData.map(
                  (
                    item
                  ) => (
                    <Cell
                      key={
                        item.reason
                      }
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

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}