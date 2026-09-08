interface FilterBarProps {
  selectedDate: string;
  selectedLine: string;
  selectedProcess: string;

  dates: string[];
  lines: string[];
  processes: string[];

  onDateChange: (value: string) => void;
  onLineChange: (value: string) => void;
  onProcessChange: (value: string) => void;
}

export default function FilterBar({
  selectedDate,
  selectedLine,
  selectedProcess,
  dates,
  lines,
  processes,
  onDateChange,
  onLineChange,
  onProcessChange,
}: FilterBarProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <div className="flex gap-6 flex-wrap">
        <div>
          <div className="font-semibold mb-2">
            Date Filter
          </div>

          <select
            value={selectedDate}
            onChange={(e) =>
              onDateChange(e.target.value)
            }
            className="border rounded px-3 py-2"
          >
            <option value="ALL">ALL</option>

            {dates.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="font-semibold mb-2">
            Line Filter
          </div>

          <select
            value={selectedLine}
            onChange={(e) =>
              onLineChange(e.target.value)
            }
            className="border rounded px-3 py-2"
          >
            <option value="ALL">ALL</option>

            {lines.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="font-semibold mb-2">
            Process Filter
          </div>

          <select
            value={selectedProcess}
            onChange={(e) =>
              onProcessChange(e.target.value)
            }
            className="border rounded px-3 py-2"
          >
            <option value="ALL">ALL</option>

            {processes.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}