"use client";

import { useState } from "react";

type Props = {
  onUploaded: (url: string) => void;
};

export default function ImageUploader({ onUploaded }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        console.error("Error respuesta upload:", data);
        alert("No se pudo subir la imagen. Intenta de nuevo.");
        return;
      }

      onUploaded(data.url);
    } catch (err) {
      console.error("Error de red al subir imagen:", err);
      alert("Error de red al subir la imagen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-200">
        Imagen (subí un PNG o JPG)
      </label>
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleFile}
        className="block w-full text-sm text-slate-200 file:mr-4 file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-100 hover:file:bg-slate-600"
      />
      {loading && (
        <p className="text-xs text-slate-400">Subiendo imagen...</p>
      )}
    </div>
  );
}
