import * as XLSX from "xlsx";

export interface ShutdownRecord {
  production_line: string;

  line_type: string;

  month: string;
  week: string;
  shutdown_date: string;

  process: string;
  reason: string;

  downtime_min: number;

  event_count: number;
}

function toString(value: unknown): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}

function toNumber(
  value: unknown
): number {
  if (!value) return 0;

  const num = Number(value);

  return Number.isNaN(num)
    ? 0
    : num;
}

function toDateString(
  value: unknown
): string {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  if (
    typeof value === "number"
  ) {

    const excelDate =
      XLSX.SSF.parse_date_code(
        value
      );

    if (!excelDate) {
      return "";
    }

    const year =
      excelDate.y;

    const month = String(
      excelDate.m
    ).padStart(2, "0");

    const day = String(
      excelDate.d
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return String(value);
}

function getProductionLineFromFileName(
  fileName: string
): string {

  const match =
    fileName.match(
      /line\s*(\d+)/i
    );

  if (!match) {

    throw new Error(
      `
Cannot detect Production Line.

File name must contain:

Line1
Line2
Line3
...

Examples:

0914-Line1.xlsx
46C0 Line1.xlsx
Copy of Line1.xlsx
`
    );

  }

  return `Line${match[1]}`;
}

function parseSheet(
  workbook: XLSX.WorkBook,
  sheetName: string,
  productionLine: string,
  lineType: string
): ShutdownRecord[] {

  const sheet =
    workbook.Sheets[sheetName];

  if (!sheet) {
    return [];
  }

  const rows =
    XLSX.utils.sheet_to_json<any>(
      sheet,
      {
        header: 1,
        defval: "",
      }
    );

  return rows
    .slice(1)
    .filter(
      (row: any[]) =>
        row[4]
    )
    .map(
      (row: any[]) => ({

        production_line:
          productionLine,

        line_type:
          lineType,

        month:
          toString(
            row[0]
          ),

        week:
          toString(
            row[1]
          ),

        shutdown_date:
          toDateString(
            row[2]
          ),

        process:
          toString(
            row[3]
          ),

        reason:
          toString(
            row[4]
          ),

        downtime_min:
          toNumber(
            row[5]
          ),

        event_count: 1,

      })
    );
}

export async function parseShutdownFile(
  file: File
): Promise<ShutdownRecord[]> {

  const productionLine =
    getProductionLineFromFileName(
      file.name
    );

  const buffer =
    await file.arrayBuffer();

  const workbook =
    XLSX.read(
      buffer,
      {
        type: "array",
      }
    );

  const stretching =
    parseSheet(
      workbook,
      "拉伸-柏拉图停机明细",
      productionLine,
      "Stretching"
    );

  const autoLine =
    parseSheet(
      workbook,
      "自动线-柏拉图停机明细",
      productionLine,
      "Auto Line"
    );

  return [
    ...stretching,
    ...autoLine,
  ];
}