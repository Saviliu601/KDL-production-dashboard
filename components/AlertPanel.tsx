interface AlertPanelProps {
  alerts: any[];
}

export default function AlertPanel({
  alerts,
}: AlertPanelProps) {
  return (
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
              {item.date} | {item.line} |{" "}
              {item.process}
            </div>

            <div>
              Achievement:
              <span className="text-red-600 font-bold">
                {" "}
                {item.achievement.toFixed(1)}%
              </span>
            </div>

            <div>
              Gap:
              <span className="text-red-600 font-bold">
                {" "}
                {item.gap}
              </span>
            </div>

            <div>
              Plan Qty: {item.planQty}
            </div>

            <div>
              Actual Qty: {item.actualQty}
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
  );
}