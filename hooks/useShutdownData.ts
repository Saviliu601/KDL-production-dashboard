"use client";

import { useEffect, useState } from "react";

import {
  parseShutdownFile,
} from "@/lib/shutdownParser";

import {
  replaceAllShutdownData,
  loadShutdownRecords,
  getLastUploadInfo,
} from "@/lib/shutdownRepository";

export function useShutdownData() {

  const [records, setRecords] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [
    lastUploadTime,
    setLastUploadTime,
  ] = useState("");

  const [
    lastFileName,
    setLastFileName,
  ] = useState("");

  const [
    selectedReason,
    setSelectedReason,
  ] =
    useState<string | null>(
      null
    );

  const [
    selectedLineType,
    setSelectedLineType,
  ] = useState("ALL");
const [
  selectedProductionLine,
  setSelectedProductionLine,
] = useState("ALL");
  const [
    selectedProcess,
    setSelectedProcess,
  ] = useState("ALL");

  const [
    startDate,
    setStartDate,
  ] = useState("");

  const [
    endDate,
    setEndDate,
  ] = useState("");

  const [
    paretoMode,
    setParetoMode,
  ] = useState<
    "TOP20" |
    "TOP50" |
    "ALL"
  >("TOP20");

  async function refreshData() {

    const data =
      await loadShutdownRecords();

    setRecords(data);

    const uploadInfo =
      await getLastUploadInfo();

    setLastUploadTime(
      uploadInfo.lastUploadTime || ""
    );

    setLastFileName(
      uploadInfo.lastFileName || ""
    );

  }

  useEffect(() => {

    refreshData();

  }, []);

 async function uploadShutdownExcel(
  files: File[]
) {

  try {

    setLoading(true);

    let allRecords: any[] = [];

    for (const file of files) {

      const parsed =
        await parseShutdownFile(
          file
        );

      allRecords = [
        ...allRecords,
        ...parsed,
      ];

    }

    const fileNames =
      files
        .map(
          (f) => f.name
        )
        .join(", ");

    await replaceAllShutdownData(
      allRecords,
      fileNames
    );

    await refreshData();

    return true;

  } catch (error) {

    console.error(error);

    return false;

  } finally {

    setLoading(false);

  }
}

  const lineTypes = [
    ...new Set(
      records.map(
        (item) =>
          item.line_type
      )
    ),
  ];

  const processes = [
    ...new Set(
      records.map(
        (item) =>
          item.process
      )
    ),
  ];

  let filteredRecords =
    [...records];

  if (
    selectedLineType !== "ALL"
  ) {

    filteredRecords =
      filteredRecords.filter(
        (item) =>
          item.line_type ===
          selectedLineType
      );

  }

  if (
    selectedProcess !== "ALL"
  ) {

    filteredRecords =
      filteredRecords.filter(
        (item) =>
          item.process ===
          selectedProcess
      );

  }

  if (startDate) {

    filteredRecords =
      filteredRecords.filter(
        (item) =>
          String(
            item.shutdown_date
          ) >= startDate
      );

  }

  if (endDate) {

    filteredRecords =
      filteredRecords.filter(
        (item) =>
          String(
            item.shutdown_date
          ) <= endDate
      );

  }

  const displayRecords =
    selectedReason
      ? filteredRecords.filter(
          (item) =>
            item.reason ===
            selectedReason
        )
      : filteredRecords;
  const totalEvents =
    displayRecords.length;

  const totalDowntime =
    displayRecords.reduce(
      (sum, item) =>
        sum +
        Number(
          item.downtime_min || 0
        ),
      0
    );

  const reasonFrequencyMap =
    filteredRecords.reduce(
      (
        acc:
          Record<string, number>,
        item
      ) => {

        acc[item.reason] =
          (
            acc[item.reason] ||
            0
          ) + 1;

        return acc;

      },
      {}
    );

  const reasonDurationMap =
    filteredRecords.reduce(
      (
        acc:
          Record<string, number>,
        item
      ) => {

        acc[item.reason] =
          (
            acc[item.reason] ||
            0
          ) +
          Number(
            item.downtime_min ||
              0
          );

        return acc;

      },
      {}
    );

  let frequencyPareto =
    Object.entries(
      reasonFrequencyMap
    )
      .map(
        ([reason, value]) => ({
          reason,
          value,
        })
      )
      .sort(
        (a, b) =>
          Number(b.value) -
          Number(a.value)
      );

  let durationPareto =
    Object.entries(
      reasonDurationMap
    )
      .map(
        ([reason, value]) => ({
          reason,
          value,
        })
      )
      .sort(
        (a, b) =>
          Number(b.value) -
          Number(a.value)
      );

  if (
    paretoMode === "TOP20"
  ) {

    frequencyPareto =
      frequencyPareto.slice(
        0,
        20
      );

    durationPareto =
      durationPareto.slice(
        0,
        20
      );

  }

  if (
    paretoMode === "TOP50"
  ) {

    frequencyPareto =
      frequencyPareto.slice(
        0,
        50
      );

    durationPareto =
      durationPareto.slice(
        0,
        50
      );

  }

  const matrixData =
    Object.keys(
      reasonFrequencyMap
    )
      .map((reason) => ({
        reason,

        frequency:
          reasonFrequencyMap[
            reason
          ] || 0,

        duration:
          reasonDurationMap[
            reason
          ] || 0,
      }))
      .filter(
        (item) =>
          !selectedReason ||
          item.reason ===
            selectedReason
      );

  const trendMap: Record<
    string,
    {
      date: string;
      downtime: number;
      events: number;
    }
  > = {};

  displayRecords.forEach(
    (item) => {

      const date =
        String(
          item.shutdown_date
        );

      if (!trendMap[date]) {

        trendMap[date] = {
          date,
          downtime: 0,
          events: 0,
        };

      }

      trendMap[date].downtime +=
        Number(
          item.downtime_min || 0
        );

      trendMap[date].events += 1;

    }
  );

  const trendData =
    Object.values(trendMap)
      .sort(
        (a, b) =>
          a.date.localeCompare(
            b.date
          )
      );

  return {

    loading,

    lastUploadTime,
    lastFileName,

    totalEvents,
    totalDowntime,

    topReasonFrequency:
      frequencyPareto[0]
        ?.reason || "-",

    topReasonDuration:
      durationPareto[0]
        ?.reason || "-",

    frequencyPareto,
    durationPareto,

    matrixData,
    trendData,

    paretoMode,
    setParetoMode,

    selectedReason,
    setSelectedReason,

    selectedLineType,
    setSelectedLineType,

    selectedProcess,
    setSelectedProcess,

    startDate,
    setStartDate,

    endDate,
    setEndDate,

    lineTypes,
    processes,

    uploadShutdownExcel,
  };
}