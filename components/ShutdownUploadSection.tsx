interface ShutdownUploadSectionProps {
  onUpload: (
    file: File
  ) => Promise<boolean>;

  lastUploadTime?: string;

  lastFileName?: string;
}

export default function ShutdownUploadSection({
  onUpload,
  lastUploadTime,
  lastFileName,
}: ShutdownUploadSectionProps) {

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0];

    if (!file) return;

    const success =
      await onUpload(file);

    if (success) {

      alert(
        "Shutdown Excel Uploaded"
      );

    } else {

      alert(
        "Upload Failed"
      );

    }

  }

  return (

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Upload Shutdown Excel
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleChange}
      />

      <div className="mt-4 border-t pt-4">

        <div className="text-sm text-gray-600">

          <div>
            <strong>
              Current Data Updated:
            </strong>
            {" "}
            {lastUploadTime
  ? new Date(
      lastUploadTime
    ).toLocaleString(
      "zh-CN",
      {
        timeZone:
          "Asia/Shanghai",
        hour12: false,
      }
    )
  : "N/A"}
          </div>

          <div className="mt-1">
            <strong>
              Current Data Source:
            </strong>
            {" "}
            {lastFileName
              ? lastFileName
              : "N/A"}
          </div>

        </div>

      </div>

    </div>

  );
}