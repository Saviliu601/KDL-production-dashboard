interface ShutdownKPISectionProps {
  totalEvents: number;

  totalDowntime: number;

  topReasonFrequency: string;

  topReasonDuration: string;
}

export default function ShutdownKPISection({
  totalEvents,
  totalDowntime,
  topReasonFrequency,
  topReasonDuration,
}: ShutdownKPISectionProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="text-gray-500">
          Shutdown Events
        </div>

        <div className="text-3xl font-bold">
          {totalEvents.toLocaleString()}
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="text-gray-500">
          Total Downtime
        </div>

        <div className="text-3xl font-bold text-red-600">
          {totalDowntime.toLocaleString()} min
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="text-gray-500">
          Top Reason (Frequency)
        </div>

        <div className="text-lg font-bold mt-2">
          {topReasonFrequency}
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="text-gray-500">
          Top Reason (Duration)
        </div>

        <div className="text-lg font-bold mt-2">
          {topReasonDuration}
        </div>
      </div>

    </div>
  );
}