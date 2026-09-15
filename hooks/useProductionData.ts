"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ProductionRecord,
  parseExcelFile,
} from "@/lib/excelParser";

import {
  replaceAllProductionData,
  loadProductionRecords,
  loadSystemInfo,
} from "@/lib/productionRepository";

export function useProductionData() {
  const [records, setRecords] = useState<
    ProductionRecord[]
  >([]);

  const [selectedDate, setSelectedDate] =
    useState("ALL");

  const [selectedLine, setSelectedLine] =
    useState("ALL");

  const [selectedProcess, setSelectedProcess] =
    useState("ALL");

  const [latestUpload, setLatestUpload] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function refreshData() {
    const data =
      await loadProductionRecords();

    setRecords(data);

    const latest =
      await loadSystemInfo();

    setLatestUpload(latest);
  }

  useEffect(() => {
    refreshData();
  }, []);

  async function uploadExcel(
    file: File
  ) {
    try {
      setLoading(true);

      const parsed =
        await parseExcelFile(file);
console.log("Excel parsed:", parsed.length);

await replaceAllProductionData(
  file.name,
  "Liu Xiaomeng",
  parsed
);

console.log("Saved to Supabase");
      await refreshData();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  }

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
      const dateMatch =
        selectedDate === "ALL" ||
        item.date === selectedDate;

      const lineMatch =
        selectedLine === "ALL" ||
        item.line === selectedLine;

      const processMatch =
        selectedProcess === "ALL" ||
        item.process === selectedProcess;

      return (
        dateMatch &&
        lineMatch &&
        processMatch
      );
    });
  }, [
    records,
    selectedDate,
    selectedLine,
    selectedProcess,
  ]);

  const planQty = filteredData.reduce(
    (sum, item: any) =>
      sum +
      Number(
        item.plan_qty ??
          item.planQty ??
          0
      ),
    0
  );

  const actualQty = filteredData.reduce(
    (sum, item: any) =>
      sum +
      Number(
        item.actual_qty ??
          item.actualQty ??
          0
      ),
    0
  );

  const avgAchievement =
    filteredData.length > 0
      ? filteredData.reduce(
          (sum: number, item: any) =>
            sum +
            Number(
              item.achievement ?? 0
            ),
          0
        ) / filteredData.length
      : 0;

  const avgOEE =
    filteredData.length > 0
      ? filteredData.reduce(
          (sum: number, item: any) =>
            sum +
            Number(
              item.actual_oee ??
                item.actualOEE ??
                0
            ),
          0
        ) / filteredData.length
      : 0;

  const alerts = filteredData.filter(
    (item: any) =>
      Number(item.achievement) < 100 ||
      Number(item.gap) < 0
  );

  const chartData = useMemo(() => {
    const grouped: Record<
      string,
      any
    > = {};

    filteredData.forEach((item: any) => {
      if (!grouped[item.date]) {
        grouped[item.date] = {
          date: item.date,
          plan: 0,
          actual: 0,
          achievement: 0,
          count: 0,
        };
      }

      grouped[item.date].plan += Number(
        item.plan_qty ??
          item.planQty ??
          0
      );

      grouped[item.date].actual += Number(
        item.actual_qty ??
          item.actualQty ??
          0
      );

      grouped[item.date].achievement +=
        Number(item.achievement ?? 0);

      grouped[item.date].count += 1;
    });

    return Object.values(grouped).map(
      (item: any) => ({
        ...item,
        achievement:
          item.count > 0
            ? item.achievement /
              item.count
            : 0,
      })
    );
  }, [filteredData]);

  return {
    loading,

    latestUpload,

    selectedDate,
    selectedLine,
    selectedProcess,

    setSelectedDate,
    setSelectedLine,
    setSelectedProcess,

    lineOptions,
    processOptions,
    dateOptions,

    chartData,
    alerts,

    planQty,
    actualQty,
    avgAchievement,
    avgOEE,

    uploadExcel,
  };
}