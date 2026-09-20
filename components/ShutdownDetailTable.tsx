interface Props {
  data: {
    reason: string;
    events: number;
    downtime: number;
    avgDowntime: number;
  }[];

  selectedReason: string | null;

  onSelectReason: (
    reason: string
  ) => void;
}

export default function ShutdownDetailTable({
  data,
  selectedReason,
  onSelectReason,
}: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-4">
        Top Shutdown Reasons
      </h2>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">

            <th className="border p-2">
              Reason
            </th>

            <th className="border p-2">
              Events
            </th>

            <th className="border p-2">
              Downtime
            </th>

            <th className="border p-2">
              Avg Downtime
            </th>

          </tr>
        </thead>

        <tbody>

          {data.map((row) => (

            <tr
              key={row.reason}
              onClick={() =>
                onSelectReason(
                  row.reason
                )
              }
              className={`
                cursor-pointer
                hover:bg-blue-100
                ${
                  selectedReason ===
                  row.reason
                    ? "bg-red-100"
                    : ""
                }
              `}
            >

              <td className="border p-2">
                {row.reason}
              </td>

              <td className="border p-2 text-center">
                {row.events}
              </td>

              <td className="border p-2 text-center">
                {row.downtime.toFixed(1)}
              </td>

              <td className="border p-2 text-center">
                {row.avgDowntime.toFixed(1)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}