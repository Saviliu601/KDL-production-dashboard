"use client";

import ShutdownKPISection from "@/components/ShutdownKPISection";
import ShutdownUploadSection from "@/components/ShutdownUploadSection";
import ShutdownFilterBar from "@/components/ShutdownFilterBar";
import ShutdownDateFilter from "@/components/ShutdownDateFilter";
import ParetoModeSelector from "@/components/ParetoModeSelector";

import FrequencyParetoChart from "@/components/FrequencyParetoChart";
import DurationParetoChart from "@/components/DurationParetoChart";
import FrequencyDurationMatrix from "@/components/FrequencyDurationMatrix";
import ShutdownTrendChart from "@/components/ShutdownTrendChart";
import ShutdownDetailTable from "@/components/ShutdownDetailTable";

import { useShutdownData } from "@/hooks/useShutdownData";

export default function ShutdownPage() {
  const {
    totalEvents,
    totalDowntime,

    topReasonFrequency,
    topReasonDuration,

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

    lastUploadTime,
    lastFileName,

    uploadShutdownExcel,
  } = useShutdownData();

  const detailTableData = (
    selectedReason
      ? matrixData.filter(
          (item) =>
            item.reason === selectedReason
        )
      : matrixData
  )
    .map((item) => ({
      reason: item.reason,
      events: item.frequency,
      downtime: item.duration,
      avgDowntime:
        item.frequency > 0
          ? item.duration / item.frequency
          : 0,
    }))
    .sort(
      (a, b) =>
        b.downtime - a.downtime
    );

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-4">

        <div>
          <h1 className="text-4xl font-bold mb-2">
            Shutdown Analysis
          </h1>

          <p className="text-gray-500">
            KDL Shutdown Intelligence Portal
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedReason(null);
            setSelectedLineType("ALL");
            setSelectedProcess("ALL");
            setStartDate("");
            setEndDate("");
          }}
          className="
            bg-red-600
            text-white
            px-4
            py-2
            rounded
            hover:bg-red-700
          "
        >
          Reset All
        </button>

      </div>

      {selectedReason && (
        <div
          className="
            bg-yellow-100
            border
            border-yellow-400
            rounded
            p-3
            mb-4
          "
        >
          Current Selection :
          {" "}
          <strong>
            {selectedReason}
          </strong>
        </div>
      )}

      <ShutdownUploadSection
        onUpload={uploadShutdownExcel}
        lastUploadTime={lastUploadTime}
        lastFileName={lastFileName}
      />

      <ShutdownDateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <ShutdownFilterBar
        selectedLineType={selectedLineType}
        selectedProcess={selectedProcess}
        lineTypes={lineTypes}
        processes={processes}
        onLineTypeChange={setSelectedLineType}
        onProcessChange={setSelectedProcess}
      />

      <ShutdownKPISection
        totalEvents={totalEvents}
        totalDowntime={totalDowntime}
        topReasonFrequency={topReasonFrequency}
        topReasonDuration={topReasonDuration}
      />

      <div className="bg-white p-4 rounded-xl shadow mt-6 mb-6">

        <div className="font-bold mb-2">
          Pareto View Mode
        </div>

        <ParetoModeSelector
          mode={paretoMode}
          onChange={setParetoMode}
        />

      </div>

      <div className="grid grid-cols-2 gap-6">

        <FrequencyParetoChart
          data={frequencyPareto}
          selectedReason={selectedReason}
          onSelectReason={setSelectedReason}
          mode={paretoMode}
        />

        <DurationParetoChart
          data={durationPareto}
          selectedReason={selectedReason}
          onSelectReason={setSelectedReason}
          mode={paretoMode}
        />

      </div>

      <div className="mt-6">

        <FrequencyDurationMatrix
          data={matrixData}
          selectedReason={selectedReason}
          onSelectReason={setSelectedReason}
        />

      </div>

      <div className="mt-6">

        <ShutdownTrendChart
          data={trendData}
        />

      </div>

      <div className="mt-6">

        <ShutdownDetailTable
          data={detailTableData}
          selectedReason={selectedReason}
          onSelectReason={setSelectedReason}
        />

      </div>

    </main>
  );
}