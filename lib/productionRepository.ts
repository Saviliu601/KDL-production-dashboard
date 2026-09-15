import { supabase } from "@/lib/supabase";
import { ProductionRecord } from "@/lib/excelParser";

export async function clearProductionRecords() {
  const { error } = await supabase
    .from("production_records")
    .delete()
    .not("id", "is", null);

  if (error) {
    throw error;
  }
}

export async function saveProductionRecords(
  records: ProductionRecord[]
) {
  if (!records.length) return;

  const rows = records.map((item) => ({
    date: item.date,

    line: item.line,
    process: item.process,

    ppm: item.ppm,
    hours: item.hours,
    minutes: item.minutes,

    plan_oee: item.planOEE,
    actual_oee: item.actualOEE,

    plan_qty: item.planQty,
    actual_qty: item.actualQty,

    achievement: item.achievement,
    gap: item.gap,

    actual_input_qty: item.actualInputQty,

    ok_rate: item.okRate,

    balance: item.balance,

    reason: item.reason,
  }));

  const { error } = await supabase
    .from("production_records")
    .insert(rows);

  if (error) {
    throw error;
  }
}

export async function updateSystemInfo(
  fileName: string,
  uploadedBy: string
) {
  await supabase
    .from("system_info")
    .delete()
    .not("id", "is", null);

  const { error } = await supabase
    .from("system_info")
    .insert([
      {
        last_file_name: fileName,
        last_upload_time:
          new Date().toISOString(),

        last_uploaded_by: uploadedBy,
      },
    ]);

  if (error) {
    throw error;
  }
}

export async function replaceAllProductionData(
  fileName: string,
  uploadedBy: string,
  records: ProductionRecord[]
) {
  await clearProductionRecords();

  await saveProductionRecords(records);

  await updateSystemInfo(
    fileName,
    uploadedBy
  );
}

export async function loadProductionRecords() {
  const { data, error } = await supabase
    .from("production_records")
    .select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function loadSystemInfo() {
  const { data, error } = await supabase
    .from("system_info")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    return null;
  }

  return data;
}
``