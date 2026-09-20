"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";

interface Props {
  data: {
    reason: string;
    frequency: number;
    duration: number;
  }[];

  selectedReason: string | null;

  onSelectReason: (
    reason: string
  ) => void;
}

const COLORS = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#ca8a04",
  "#9333ea",
  "#0891b2",
  "#ea580c",
  "#db2777",
  "#0f766e",
  "#7c3aed",
];

export default function FrequencyDurationMatrix({
  data,
  selectedReason,
  onSelectReason,
}: Props) {

  const top10Labels =
    [...data]
      .sort(
        (a, b) =>
          b.duration - a.duration
      )
      .slice(0, 10)
      .map(
        (item) => item.reason
      );

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Frequency × Duration Matrix
      </h2>

      <div className="grid grid-cols-4 gap-4">

        <div className="col-span-3 h-[650px]">

          <ResponsiveContainer>

            <ScatterChart
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 40,
              }}
            >

              <CartesianGrid />

              <XAxis
                type="number"
                dataKey="frequency"
                label={{
                  value:
                    "Frequency (Times)",
                  position:
                    "bottom",
                }}
              />

              <YAxis
                type="number"
                dataKey="duration"
                label={{
                  value:
                    "Downtime (Min)",
                  angle: -90,
                  position:
                    "insideLeft",
                }}
              />

              <Tooltip
                content={({
                  active,
                  payload,
                }) => {

                  if (
                    active &&
                    payload &&
                    payload.length
                  ) {

                    const item =
                      payload[0]
                        .payload;

                    return (
                      <div className="bg-white border shadow p-3">

                        <div className="font-bold">
                          {
                            item.reason
                          }
                        </div>

                        <div>
                          Frequency :
                          {" "}
                          {
                            item.frequency
                          }
                          {" "}
                          Times
                        </div>

                        <div>
                          Downtime :
                          {" "}
                          {
                            item.duration
                          }
                          {" "}
                          Min
                        </div>

                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Scatter
                data={data}
                onClick={(
                  item
                ) =>
                  onSelectReason(
                    item.reason
                  )
                }
              >

                <LabelList
                  dataKey="reason"
                  formatter={(
                    value: any
                  ) =>
                    top10Labels.includes(
                      value
                    )
                      ? value
                      : ""
                  }
                />

                {data.map(
                  (
                    item,
                    index
                  ) => (
                    <Cell
                      key={
                        item.reason
                      }
                      fill={
                        selectedReason &&
                        selectedReason !==
                          item.reason
                          ? "#d1d5db"
                          : COLORS[
                              index %
                                COLORS.length
                            ]
                      }
                    />
                  )
                )}

              </Scatter>

            </ScatterChart>

          </ResponsiveContainer>

        </div>

        <div className="border rounded p-3 overflow-y-auto max-h-[650px]">

          <div className="font-bold mb-3">
            Legend
          </div>

          {data.map(
            (
              item,
              index
            ) => (
              <div
                key={item.reason}
                onClick={() =>
                  onSelectReason(
                    item.reason
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  cursor-pointer
                  mb-2
                  hover:bg-gray-100
                  p-1
                  rounded
                "
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor:
                      COLORS[
                        index %
                          COLORS.length
                      ],
                  }}
                />

                <span className="text-sm">
                  {
                    item.reason
                  }
                </span>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}