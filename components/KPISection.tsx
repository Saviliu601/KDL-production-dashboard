interface KPISectionProps {
  planQty: number;
  actualQty: number;
  achievement: number;
  avgOEE: number;
}

export default function KPISection({
  planQty,
  actualQty,
  achievement,
  avgOEE,
}: KPISectionProps) {
  return (
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
            achievement >= 100
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {achievement.toFixed(1)}%
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <div className="text-gray-500">
          Average OEE
        </div>

        <div className="text-3xl font-bold">
          {avgOEE.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}