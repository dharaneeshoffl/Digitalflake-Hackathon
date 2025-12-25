import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import ImageUploadBox from "../../components/ImageUploadBox";

export default function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const update = async () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("status", form.status);
    if (image) fd.append("image", image);

    await api.put(`/products/${id}`, fd);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

      <input
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-3 rounded mb-4"
      />

      <ImageUploadBox onChange={setImage} />

      <select
        value={form.status || ""}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full border p-3 rounded my-4"
      >
        <option>Active</option>
        <option>Realme</option>
      </select>

      <div className="flex gap-4">
        <button className="border px-6 py-2 rounded">Cancel</button>
        <button
          onClick={update}
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
