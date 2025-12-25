import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import api from "../services/api";
import DeleteModal from "../components/DeleteModal";
import ImageUpload from "../components/ImageUpload";

export default function Category() {
  const [rows, setRows] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const loadData = async () => {
    const res = await api.get("/category");
    setRows(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCategory = async () => {
    if (!name || !image) return toast.error("All fields required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    await api.post("/category", formData);
    toast.success("Category added");
    setName("");
    setImage(null);
    loadData();
  };

  const columns = [
    { field: "name", headerName: "Category Name", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      renderCell: (p) => <img src={p.value} className="w-10 h-10 rounded" />,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (p) => (p.value ? "Active" : "Inactive"),
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (p) => (
        <button onClick={() => setDeleteId(p.row._id)} className="text-red-500">
          Delete
        </button>
      ),
    },
  ];

  const confirmDelete = async () => {
    await api.delete(`/category/${deleteId}`);
    toast.success("Deleted");
    setDeleteId(null);
    loadData();
  };

  return (
    <div>
      <h2 className="font-semibold mb-4">Add Category</h2>
      <input
        className="border p-2 mb-3 w-full"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ImageUpload onChange={setImage} />
      <button
        onClick={addCategory}
        className="mt-3 bg-primary text-white px-4 py-2 rounded"
      >
        Save
      </button>

      <div className="mt-6">
        <DataGrid rows={rows} columns={columns} getRowId={(r) => r._id} />
      </div>

      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
