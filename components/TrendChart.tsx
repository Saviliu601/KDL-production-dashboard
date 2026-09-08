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

interface TrendChartProps {
  chartData: any[];
}

export default function TrendChart({
  chartData,
}: TrendChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">
        Daily Production Trend
      </h2>

      <div className="h-[450px]">
        <ResponsiveContainer>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis
              yAxisId="qty"
              label={{
                value: "PCS",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <YAxis
              yAxisId="achievement"
              orientation="right"
              domain={[0, 200]}
              tickFormatter={(v) => `${v}%`}
            />

            <Tooltip />

            <Legend />

            <Bar
              yAxisId="qty"
              dataKey="actual"
              name="Actual Qty"
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.achievement < 100
                        ? "#dc2626"
                        : "#2563eb"
                    }
                  />
                )
              )}
            </Bar>

            <Line
              yAxisId="qty"
              type="monotone"
              dataKey="plan"
              stroke="#dc2626"
              strokeWidth={3}
              name="Plan Qty"
            />

            <Line
              yAxisId="achievement"
              type="monotone"
              dataKey="achievement"
              stroke="#16a34a"
              strokeWidth={3}
              name="Achievement %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
``