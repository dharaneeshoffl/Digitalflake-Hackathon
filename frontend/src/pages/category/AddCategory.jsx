import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import ImageUploadBox from "../../components/ImageUploadBox";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const navigate = useNavigate();

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
      navigate("/category");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>

      
      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

    
      <ImageUploadBox onChange={setImage} />

     
      <select
        className="w-full border p-3 rounded my-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

    
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/category")}
          className="border px-6 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={save}
          disabled={loading}
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
