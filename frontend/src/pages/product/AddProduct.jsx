import { useEffect, useState } from "react";
import api from "../../services/api";
import ImageUploadBox from "../../components/ImageUploadBox";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
    api.get("/subcategories").then((res) => setSubcategories(res.data));
  }, []);

  const save = async () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    fd.append("subcategory", subcategory);
    fd.append("status", status);
    fd.append("image", image);

    await api.post("/products", fd);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>

      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="w-full border p-3 rounded mb-4"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        className="w-full border p-3 rounded mb-4"
        onChange={(e) => setSubcategory(e.target.value)}
      >
        <option>Select Sub Category</option>
        {subcategories.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <ImageUploadBox onChange={setImage} />

      <select
        className="w-full border p-3 rounded my-4"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Active</option>
        <option>Realme</option>
      </select>

      <div className="flex gap-4">
        <button className="border px-6 py-2 rounded">Cancel</button>
        <button
          onClick={save}
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
