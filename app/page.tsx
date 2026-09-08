"use client";

import { useMemo, useState } from "react";

import { ProductionRecord, parseExcelFile } from "@/lib/excelParser";

import KPISection from "@/components/KPISection";
import FilterBar from "@/components/FilterBar";
import TrendChart from "@/components/TrendChart";
import AlertPanel from "@/components/AlertPanel";

export default function Home() {
  const [records, setRecords] = useState<ProductionRecord[]>([]);

  const [selectedLine, setSelectedLine] =
    useState("ALL");

  const [selectedProcess, setSelectedProcess] =
    useState("ALL");

  const [selectedDate, setSelectedDate] =
    useState("ALL");

  const [uploadHistory, setUploadHistory] =
    useState<any[]>([]);

  const [latestUpload, setLatestUpload] =
    useState<any>(null);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    try {
      const parsed =
        await parseExcelFile(file);

      setRecords(parsed);

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
    } catch (err) {
      console.error(err);

      alert(
        "Failed to read Sheet1 from Excel"
      );
    }
  };

  const lineOptions = useMemo(
    () =>
      [
        ...new Set(
          records.map(
            (item) => item.line
          )
        ),
      ].sort(),
    [records]
  );

  const processOptions = useMemo(
    () =>
      [
        ...new Set(
          records.map(
            (item) => item.process
          )
        ),
      ].sort(),
    [records]
  );

  const dateOptions = useMemo(
    () =>
      [
        ...new Set(
          records.map(
            (item) => item.date
          )
        ),
      ].sort(),
    [records]
  );

  const filteredData = useMemo(() => {
    return records.filter((item) => {
      const lineMatch =
        selectedLine === "ALL" ||
        item.line === selectedLine;

      const processMatch =
        selectedProcess === "ALL" ||
        item.process === selectedProcess;

      const dateMatch =
        selectedDate === "ALL" ||
        item.date === selectedDate;

      return (
        lineMatch &&
        processMatch &&
        dateMatch
      );
    });
  }, [
    records,
    selectedLine,
    selectedProcess,
    selectedDate,
  ]);

  const planQty = filteredData.reduce(
    (sum, item) =>
      sum + (item.planQty || 0),
    0
  );

  const actualQty = filteredData.reduce(
    (sum, item) =>
      sum + (item.actualQty || 0),
    0
  );

  const avgAchievement =
    filteredData.length > 0
      ? filteredData.reduce(
          (sum, item) =>
            sum +
            (item.achievement || 0),
          0
        ) / filteredData.length
      : 0;

  const avgOEE =
    filteredData.length > 0
      ? filteredData.reduce(
          (sum, item) =>
            sum +
            (item.actualOEE || 0),
          0
        ) / filteredData.length
      : 0;

  const alerts = filteredData.filter(
    (item) =>
      item.achievement < 100 ||
      item.gap < 0
  );

  const chartData = useMemo(() => {
    const grouped: Record<
      string,
      {
        date: string;
        plan: number;
        actual: number;
        achievement: number;
        count: number;
      }
    > = {};

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

      grouped[item.date].plan +=
        item.planQty;

      grouped[item.date].actual +=
        item.actualQty;

      grouped[item.date].achievement +=
        item.achievement;

      grouped[item.date].count += 1;
    });

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        achievement:
          item.count > 0
            ? item.achievement /
              item.count
            : 0,
      }))
      .sort(
        (a, b) =>
          new Date(
            a.date
          ).getTime() -
          new Date(
            b.date
          ).getTime()
      );
  }, [filteredData]);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-blue-800 text-white p-5">
        <h1 className="text-3xl font-bold">
          KDL Dashboard
        </h1>
      </div>

      <div className="p-8">
        <KPISection
          planQty={planQty}
          actualQty={actualQty}
          achievement={avgAchievement}
          avgOEE={avgOEE}
        />

        <FilterBar
          selectedDate={selectedDate}
          selectedLine={selectedLine}
          selectedProcess={selectedProcess}
          dates={dateOptions}
          lines={lineOptions}
          processes={processOptions}
          onDateChange={
            setSelectedDate
          }
          onLineChange={
            setSelectedLine
          }
          onProcessChange={
            setSelectedProcess
          }
        />

        <TrendChart
          chartData={chartData}
        />

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold mb-4">
            Upload Excel
          </h2>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={
              handleFileUpload
            }
          />
        </div>

        {latestUpload && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-xl font-bold mb-4">
              Latest Upload
            </h2>

            <div>
              <p>
                <b>File:</b>{" "}
                {
                  latestUpload.fileName
                }
              </p>

              <p>
                <b>Time:</b>{" "}
                {latestUpload.time}
              </p>
            </div>
          </div>
        )}

        <AlertPanel alerts={alerts} />
      </div>
    </main>
  );
}