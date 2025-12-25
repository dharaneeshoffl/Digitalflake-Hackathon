import { useEffect, useRef, useState } from "react";

export default function ImageUpload({ onChange, initialPreview = null }) {
  const [preview, setPreview] = useState(initialPreview);
  const [error, setError] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  const handleFile = (file) => {
    if (!file) return;
    const maxMB = 5;
    if (file.size / 1024 / 1024 > maxMB) {
      setError(`Max file size ${maxMB}MB`);
      return;
    }
    setError("");
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const onInput = (e) => handleFile(e.target.files?.[0]);

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="border border-dashed border-borderLight rounded p-4 text-center"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-36 h-36 object-cover mx-auto rounded"
          />
        ) : (
          <div className="py-6">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto opacity-40"
            >
              <path d="M16 16v4H8v-4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 3v11" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <div className="text-sm text-gray-500 mt-2">Upload image</div>
            <div className="text-xs text-gray-400">Max size 5MB</div>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onInput}
          className="mt-3 w-full text-sm"
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
