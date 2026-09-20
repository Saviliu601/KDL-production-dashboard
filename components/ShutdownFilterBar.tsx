interface Props {
  selectedLineType: string;
  selectedProcess: string;

  lineTypes: string[];
  processes: string[];

  onLineTypeChange: (
    value: string
  ) => void;

  onProcessChange: (
    value: string
  ) => void;
}

export default function ShutdownFilterBar({
  selectedLineType,
  selectedProcess,

  lineTypes,
  processes,

  onLineTypeChange,
  onProcessChange,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">

      <div className="flex gap-6 flex-wrap">

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
            className="border rounded px-3 py-2"
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
            className="border rounded px-3 py-2"
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