import * as XLSX from "xlsx";

export interface ProductionRecord {
  line: string;
  process: string;
  date: string;

  ppm: number;
  hours: number;
  minutes: number;

  planOEE: number;
  actualOEE: number;

  planQty: number;
  actualQty: number;

  achievement: number;
  gap: number;

  actualInputQty: number;
  okRate: number;

  balance: number;

  reason: string;
}

function toNumber(value: unknown): number {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const num = Number(value);

  return Number.isNaN(num) ? 0 : num;
}

function toString(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

export async function parseExcelFile(
  file: File
): Promise<ProductionRecord[]> {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
  });

  const sheet = workbook.Sheets["Sheet1"];

  if (!sheet) {
    throw new Error(
      "Cannot find worksheet named Sheet1"
    );
  }

  const rows = XLSX.utils.sheet_to_json<any>(sheet, {
    defval: "",
  });

  return rows
    .filter(
      (row) =>
        row["Line"] &&
        row["Process"] &&
        row["日期"]
    )
    .map((row) => ({
      line: toString(row["Line"]),
      process: toString(row["Process"]),
      date: toString(row["日期"]),

      ppm: toNumber(row["PPM"]),
      hours: toNumber(row["Hours"]),
      minutes: toNumber(row["Minutes"]),

      planOEE: toNumber(row["Plan OEE"]),
      actualOEE: toNumber(row["Actual OEE"]),

      planQty: toNumber(row["Plan output QTY"]),
      actualQty: toNumber(row["Actual output QTY"]),

      achievement: toNumber(
        row["Archieve rate"] ??
        row["Achievement rate"]
      ),

      gap: toNumber(row["Gap"]),

      actualInputQty: toNumber(
        row["Actual input QTY"]
      ),

      okRate: toNumber(row["OK rate"]),

      balance: toNumber(
        row["结余"] ?? row["Balance"]
      ),

      reason: toString(
        row["未达成原因"] ?? row["Reason"]
      ),
    }));
}
