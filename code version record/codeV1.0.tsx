"use client";

import { useState, useMemo } from "react";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const productionData = [
  {
    date: "8/13",
    line: "L1",
    process: "拉伸",
    plan: 31920,
    actual: 28345,
    oee: 76,
    achievement: 88.8,
    gap: -3575,
    reason: "气缸异常报警厂家维修",
  },
  {
    date: "8/14",
    line: "L1",
    process: "拉伸",
    plan: 31920,
    actual: 31920,
    oee: 76,
    achievement: 100,
    gap: 0,
    reason: "",
  },
  {
    date: "8/15",
    line: "L1",
    process: "拉伸",
    plan: 31920,
    actual: 40000,
    oee: 78,
    achievement: 125,
    gap: 8080,
    reason: "",
  },
  {
    date: "8/16",
    line: "L1",
    process: "拉伸",
    plan: 31920,
    actual: 30000,
    oee: 72,
    achievement: 94,
    gap: -1920,
    reason: "设备异常",
  },
  {
    date: "8/17",
    line: "L1",
    process: "拉伸",
    plan: 31920,
    actual: 42000,
    oee: 80,
    achievement: 132,
    gap: 10080,
    reason: "",
  },

  {
    date: "8/13",
    line: "L2",
    process: "铆接",
    plan: 31920,
    actual: 25000,
    oee: 70,
    achievement: 78,
    gap: -6920,
    reason: "待料",
  },
  {
    date: "8/14",
    line: "L2",
    process: "铆接",
    plan: 31920,
    actual: 27000,
    oee: 72,
    achievement: 85,
    gap: -4920,
    reason: "",
  },

  {
    date: "8/15",
    line: "L3",
    process: "除尘",
    plan: 23520,
    actual: 31500,
    oee: 68,
    achievement: 134,
    gap: 7980,
    reason: "",
  },

  {
    date: "8/17",
    line: "L4",
    process: "全检",
    plan: 20160,
    actual: 15000,
    oee: 60,
    achievement: 74,
    gap: -5160,
    reason: "人员不足",
  },
];

export default function Home() {
  const [selectedLine, setSelectedLine] = useState("ALL");
  const [selectedProcess, setSelectedProcess] =
    useState("ALL");

  const [uploadHistory, setUploadHistory] = useState<any[]>([
    {
      fileName: "KDL Jul.xlsx",
      uploadedBy: "Liu Xiaomeng",
      time: "2026-08-13 09:30",
    },
  ]);

  const [latestUpload, setLatestUpload] =
    useState<any>(uploadHistory[0]);

  const filteredData = useMemo(() => {
    return productionData.filter((item) => {
      const lineMatch =
        selectedLine === "ALL" ||
        item.line === selectedLine;

      const processMatch =
        selectedProcess === "ALL" ||
        item.process === selectedProcess;

      return lineMatch && processMatch;
    });
  }, [selectedLine, selectedProcess]);

  const chartData = useMemo(() => {
    const grouped: any = {};

    filteredData.forEach((item) => {
      if (!grouped[item.date]) {
        grouped[item.date] = {
          date: item.date,
          plan: 0,
          actual: 0,
          achievement: 0,
          count: 0,
        };
      }

      grouped[item.date].plan += item.plan;
      grouped[item.date].actual += item.actual;
      grouped[item.date].achievement +=
        item.achievement;
      grouped[item.date].count += 1;
    });

    return Object.values(grouped)
  .map((item: any) => ({
    ...item,
    achievement:
      item.count > 0
        ? item.achievement / item.count
        : 0,
  }))
  .sort(
    (a: any, b: any) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );
  }, [filteredData]);

  const planQty = filteredData.reduce(
    (sum, item) => sum + item.plan,
    0
  );

  const actualQty = filteredData.reduce(
    (sum, item) => sum + item.actual,
    0
  );

  const avgAchievement =
    filteredData.length > 0
      ? (
          filteredData.reduce(
            (sum, item) =>
              sum + item.achievement,
            0
          ) / filteredData.length
        ).toFixed(1)
      : "0";

  const avgOEE =
    filteredData.length > 0
      ? (
          filteredData.reduce(
            (sum, item) => sum + item.oee,
            0
          ) / filteredData.length
        ).toFixed(1)
      : "0";

  const alerts = filteredData.filter(
    (item) =>
      item.achievement < 100 ||
      item.gap < 0
  );

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const upload = {
      fileName: file.name,
      uploadedBy: "Liu Xiaomeng",
      time: new Date().toLocaleString(),
    };

    setLatestUpload(upload);

    setUploadHistory((prev) => [
      upload,
      ...prev,
    ]);
  };

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="bg-blue-800 text-white p-5">
        <h1 className="text-3xl font-bold">
          KDL Dashboard
        </h1>
      </div>

      <div className="p-8">

        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <div className="text-gray-500">
              Plan Qty
            </div>
            <div className="text-3xl font-bold">
              {planQty.toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <div className="text-gray-500">
              Actual Qty
            </div>
            <div className="text-3xl font-bold">
              {actualQty.toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <div className="text-gray-500">
              Achievement
            </div>

            <div
              className={`text-3xl font-bold ${
                Number(avgAchievement) >= 100
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {avgAchievement}%
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <div className="text-gray-500">
              Average OEE
            </div>
            <div className="text-3xl font-bold">
              {avgOEE}%
            </div>
          </div>

        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-6">

          <div className="flex gap-6">

            <div>
              <div className="font-semibold mb-2">
                Line Filter
              </div>

              <select
                value={selectedLine}
                onChange={(e) =>
                  setSelectedLine(e.target.value)
                }
                className="border rounded px-3 py-2"
              >
                <option>ALL</option>
                <option>L1</option>
                <option>L2</option>
                <option>L3</option>
                <option>L4</option>
              </select>
            </div>

            <div>
              <div className="font-semibold mb-2">
                Process Filter
              </div>

              <select
                value={selectedProcess}
                onChange={(e) =>
                  setSelectedProcess(
                    e.target.value
                  )
                }
                className="border rounded px-3 py-2"
              >
                <option>ALL</option>
                <option>拉伸</option>
                <option>铆接</option>
                <option>除尘</option>
                <option>全检</option>
                <option>GP12</option>
              </select>
            </div>

          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Daily Production Trend
          </h2>

          <div className="h-[420px]">

            <ResponsiveContainer>
              <ComposedChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />
                <YAxis />

                <Tooltip />
                <Legend />

                <Bar
                  dataKey="actual"
                  fill="#2563eb"
                  name="Actual"
                />

                <Line
                  dataKey="plan"
                  stroke="#dc2626"
                  strokeWidth={3}
                  name="Plan"
                />

                <Line
                  dataKey="achievement"
                  stroke="#16a34a"
                  strokeWidth={3}
                  name="Achievement %"
                />

              </ComposedChart>
            </ResponsiveContainer>

          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Upload Excel
          </h2>

          <input
            type="file"
            onChange={handleFileUpload}
          />

        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-xl font-bold mb-4">
            Latest Upload
          </h2>

          <div>
            <p>
              <b>File Name:</b>{" "}
              {latestUpload?.fileName}
            </p>

            <p>
              <b>Uploaded By:</b>{" "}
              {latestUpload?.uploadedBy}
            </p>

            <p>
              <b>Upload Time:</b>{" "}
              {latestUpload?.time}
            </p>
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-xl font-bold mb-4">
            Upload History
          </h2>

          {uploadHistory.map((item, index) => (
            <div
              key={index}
              className="border-b py-2"
            >
              {item.fileName} | {item.uploadedBy}
              {" | "}
              {item.time}
            </div>
          ))}

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Alerts
          </h2>

          <div className="space-y-3">

            {alerts.map((item, index) => (
              <div
                key={index}
                className="bg-red-100 border border-red-300 p-3 rounded"
              >
                <div>
                  {item.line} - {item.process}
                </div>

                <div>
                  Achievement:
                  <span className="text-red-600 font-bold">
                    {" "}
                    {item.achievement}%
                  </span>
                </div>

                <div>
                  Gap:
                  <span className="text-red-600 font-bold">
                    {" "}
                    {item.gap}
                  </span>
                </div>

                {item.reason && (
                  <div>
                    Reason: {item.reason}
                  </div>
                )}
              </div>
            ))}

          </div>

        </div>

      </div>
    </main>
  );
}