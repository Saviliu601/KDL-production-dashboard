interface Props {
  startDate: string;
  endDate: string;

  onStartDateChange: (
    value: string
  ) => void;

  onEndDateChange: (
    value: string
  ) => void;
}

export default function ShutdownDateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">

      <div className="flex gap-6">

        <div>
          <div className="font-semibold mb-2">
            From Date
          </div>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              onStartDateChange(
                e.target.value
              )
            }
            className="
              border
              rounded
              px-3
              py-2
            "
          />
        </div>

        <div>
          <div className="font-semibold mb-2">
            To Date
          </div>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              onEndDateChange(
                e.target.value
              )
            }
            className="
              border
              rounded
              px-3
              py-2
            "
          />
        </div>

      </div>

    </div>
  );
}