export default function ImageUploadBox({ onChange }) {
  return (
    <input
      type="file"
      accept="image/*"
      className="w-full border p-3 rounded"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          onChange(file); 
        }
      }}
    />
  );
}
