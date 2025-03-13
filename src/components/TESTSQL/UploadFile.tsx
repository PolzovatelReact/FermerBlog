import React, { useState } from "react";

const UploadFile: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Выберите файл!");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setUploading(true);
    try {
      const response = await fetch("http://localhost:5013/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка загрузки");

      alert("Файлы успешно загружены!");
      setFiles([]); // Очищаем список файлов после успешной загрузки
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Не удалось загрузить файлы");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border p-2"
        accept="image/*,.png,.jpg.,.gif,.web"
      />
      <ul className="mt-3">
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? "Загрузка..." : "Загрузить файлы"}
      </button>
    </>
  );
};
export default UploadFile;
