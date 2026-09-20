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

export async function updateLastUploadInfo(
  fileName?: string
) {

  const now =
    new Date().toISOString();

  const { error } = await supabase
    .from("system_info")
    .upsert({
      id: 1,
      last_upload_time: now,
      last_file_name:
        fileName || "",
    });

  if (error) {
    console.error(error);
  }
}

export async function getLastUploadInfo() {

  const { data, error } =
    await supabase
      .from("system_info")
      .select(
        "last_upload_time,last_file_name"
      )
      .eq("id", 1)
      .single();

  if (error) {

    return {
      lastUploadTime: "",
      lastFileName: "",
    };

  }

  return {
    lastUploadTime:
      data?.last_upload_time || "",

    lastFileName:
      data?.last_file_name || "",
  };
}

export async function replaceAllShutdownData(
  records: ShutdownRecord[],
  fileName?: string
) {

  await clearShutdownRecords();

  await saveShutdownRecords(
    records
  );

  await updateLastUploadInfo(
    fileName
  );
}

export async function loadShutdownRecords() {

  const { data, error } =
    await supabase
      .from("shutdown_records")
      .select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
}