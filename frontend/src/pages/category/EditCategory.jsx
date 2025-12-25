import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import ImageUploadBox from "../../components/ImageUploadBox";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  
  useEffect(() => {
    api.get(`/categories/${id}`).then((res) => {
      setName(res.data.name);
      setStatus(res.data.status);
      setPreview(res.data.image);
    });
  }, [id]);

 
  const updateCategory = async () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("status", status);
    if (image) fd.append("image", image);

    await api.put(`/categories/${id}`, fd);
    navigate("/category");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl">
     
      <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

    
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
        placeholder="Category Name"
      />

    
      {preview && (
        <div className="mb-4">
          <p className="text-sm mb-2">Current Image</p>
          <img src={preview} alt="category" className="h-16 rounded-lg" />
        </div>
      )}

    
      <ImageUploadBox onChange={setImage} />

      
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-3 rounded-lg my-4"
      >
        <option value="Active">Active</option>
        <option value="Realme">Realme</option>
      </select>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/category")}
          className="border px-6 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={updateCategory}
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
