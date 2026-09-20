interface Props {
  mode: "TOP20" | "TOP50" | "ALL";

  onChange: (
    mode: "TOP20" | "TOP50" | "ALL"
  ) => void;
}

export default function ParetoModeSelector({
  mode,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 mb-4">

      <button
        onClick={() => onChange("TOP20")}
        className={`
          px-3 py-1 rounded border
          ${
            mode === "TOP20"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }
        `}
      >
        TOP20
      </button>

      <button
        onClick={() => onChange("TOP50")}
        className={`
          px-3 py-1 rounded border
          ${
            mode === "TOP50"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }
        `}
      >
        TOP50
      </button>

      <button
        onClick={() => onChange("ALL")}
        className={`
          px-3 py-1 rounded border
          ${
            mode === "ALL"
              ? "bg-blue-600 text-white"
              : "bg-white"
          }
        `}
      >
        ALL
      </button>

    </div>
  );
}
``