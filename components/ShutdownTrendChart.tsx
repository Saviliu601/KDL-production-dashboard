"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

interface Props {
  data: {
    date: string;
    downtime: number;
    events: number;
  }[];
}

export default function ShutdownTrendChart({
  data,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Shutdown Trend Analysis
      </h2>

      <div className="h-[500px]">

        <ResponsiveContainer>

          <ComposedChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
            />

            <YAxis
              yAxisId="downtime"
              label={{
                value:
                  "Downtime (Min)",
                angle: -90,
                position:
                  "insideLeft",
              }}
            />

            <YAxis
              yAxisId="events"
              orientation="right"
              label={{
                value:
                  "Events (Times)",
                angle: 90,
                position:
                  "insideRight",
              }}
            />

            <Tooltip />

            <Legend />

            <Line
              yAxisId="downtime"
              type="monotone"
              dataKey="downtime"
              name="Downtime (Min)"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 5 }}
            />

            <Line
              yAxisId="events"
              type="monotone"
              dataKey="events"
              name="Events (Times)"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />

          </ComposedChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}