interface Props {
  startDate: string;
  endDate: string;

  selectedLineType: string;
  selectedProcess: string;

  lineTypes: string[];
  processes: string[];

  onStartDateChange: (
    value: string
  ) => void;

  onEndDateChange: (
    value: string
  ) => void;

  onLineTypeChange: (
    value: string
  ) => void;

  onProcessChange: (
    value: string
  ) => void;
}

export default function ShutdownFilterPanel({
  startDate,
  endDate,

  selectedLineType,
  selectedProcess,

  lineTypes,
  processes,

  onStartDateChange,
  onEndDateChange,

  onLineTypeChange,
  onProcessChange,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">

      <div className="grid grid-cols-4 gap-6">

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
              w-full
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
              w-full
            "
          />

        </div>

        <div>

          <div className="font-semibold mb-2">
            Line Type
          </div>

          <select
            value={selectedLineType}
            onChange={(e) =>
              onLineTypeChange(
                e.target.value
              )
            }
            className="
              border
              rounded
              px-3
              py-2
              w-full
            "
          >
            <option value="ALL">
              ALL
            </option>

            {lineTypes.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

        </div>

        <div>

          <div className="font-semibold mb-2">
            Process
          </div>

          <select
            value={selectedProcess}
            onChange={(e) =>
              onProcessChange(
                e.target.value
              )
            }
            className="
              border
              rounded
              px-3
              py-2
              w-full
            "
          >
            <option value="ALL">
              ALL
            </option>

            {processes.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

        </div>

      </div>

    </div>
  );
}