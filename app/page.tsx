export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-6">
        KDL Shutdown Dashboard
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Shutdown Intelligence Portal
      </p>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-bold">Total Shutdown Events</h2>
          <p className="text-3xl mt-3">0</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-bold">Total Downtime</h2>
          <p className="text-3xl mt-3">0 min</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-bold">Top Reason (Frequency)</h2>
          <p className="mt-3">-</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-bold">Top Reason (Duration)</h2>
          <p className="mt-3">-</p>
        </div>

      </div>
    </main>
  );
}