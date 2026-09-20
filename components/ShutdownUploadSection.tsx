interface ShutdownUploadSectionProps {
  onUpload: (file: File) => Promise<boolean>;
}

export default function ShutdownUploadSection({
  onUpload,
}: ShutdownUploadSectionProps) {
  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const success = await onUpload(file);

    if (success) {
      alert("Shutdown Excel Uploaded");
    } else {
      alert("Upload Failed");
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
    </div>
  );
}