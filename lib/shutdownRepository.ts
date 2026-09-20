import { supabase } from "@/lib/supabase";
import { ShutdownRecord } from "@/lib/shutdownParser";

export async function clearShutdownRecords() {
  const { error } = await supabase
    .from("shutdown_records")
    .delete()
    .not("id", "is", null);

  if (error) {
    throw error;
  }
}

export async function saveShutdownRecords(
  records: ShutdownRecord[]
) {
  if (!records.length) return;

  const rows = records.map((item) => ({
    line_type: item.line_type,

    month: item.month,
    week: item.week,

    shutdown_date: item.shutdown_date,

    process: item.process,

    reason: item.reason,

    downtime_min: item.downtime_min,

    event_count: item.event_count,
  }));

  const { error } = await supabase
    .from("shutdown_records")
    .insert(rows);

  if (error) {
    throw error;
  }
}

export async function replaceAllShutdownData(
  records: ShutdownRecord[]
) {
  await clearShutdownRecords();

  await saveShutdownRecords(records);
}

export async function loadShutdownRecords() {
  const { data, error } = await supabase
    .from("shutdown_records")
    .select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
}
