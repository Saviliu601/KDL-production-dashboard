interface Props {
  startDate: string;
  endDate: string;

  selectedProductionLine: string;
  selectedLineType: string;
  selectedProcess: string;

  productionLines: string[];
  lineTypes: string[];
  processes: string[];

  onStartDateChange: (
    value: string
  ) => void;

  onEndDateChange: (
    value: string
  ) => void;

  onProductionLineChange: (
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

  selectedProductionLine,
  selectedLineType,
  selectedProcess,

  productionLines,
  lineTypes,
  processes,

  onStartDateChange,
  onEndDateChange,

  onProductionLineChange,
  onLineTypeChange,
  onProcessChange,
}: Props) {
  return (
    <div className="bg-white p-4 md:p-5 rounded-xl shadow mb-6">

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-5
          gap-4
        "
      >

        <div>

          <div className="font-semibold mb-2 text-sm">
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

          <div className="font-semibold mb-2 text-sm">
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

          <div className="font-semibold mb-2 text-sm">
            Production Line
          </div>

          <select
            value={
              selectedProductionLine
            }
            onChange={(e) =>
              onProductionLineChange(
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

            {productionLines.map(
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

          <div className="font-semibold mb-2 text-sm">
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

          <div className="font-semibold mb-2 text-sm">
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