import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import ImageUploadBox from "../../components/ImageUploadBox";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const save = async () => {
   
    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    if (!image) {
      return toast.error("Category image is required");
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", name);
      fd.append("status", status);
      fd.append("image", image);

      await api.post("/categories", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category added successfully");

      
      setName("");
      setStatus("Active");
      setImage(null);
    } catch (err) {
      console.error("SAVE ERROR:", err?.response || err);
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>

     
      <input
        value={name}
        className="w-full border p-3 rounded mb-4"
        placeholder="Category Name"
        onChange={(e) => setName(e.target.value)}
      />

  
      <ImageUploadBox onChange={setImage} />

     
      <select
        value={status}
        className="w-full border p-3 rounded my-4"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="Realme">Realme</option>
      </select>

    
      <div className="flex gap-4">
        <button
          type="button"
          className="border px-6 py-2 rounded"
          onClick={() => {
            setName("");
            setImage(null);
            setStatus("Active");
          }}
        >
          Cancel
        </button>

        <button
          onClick={save}
          disabled={loading}
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
