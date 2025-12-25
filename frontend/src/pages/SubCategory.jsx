import { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../services/api";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import DeleteModal from "../components/DeleteModal";
import ImageUpload from "../components/ImageUpload";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000";

export default function SubCategory() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const loadData = async () => {
    try {
      const [sub, cat] = await Promise.all([
        api.get("/subcategories"),
        api.get("/categories"),
      ]);
      setRows(sub.data || []);
      setCategories(cat.data || []);
    } catch (err) {
      toast.error("Failed to load data");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const save = async () => {
    if (!name || !category) return toast.error("All fields required");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    fd.append("status", status);
    if (image) fd.append("image", image);

    try {
      editId
        ? await api.put(`/subcategories/${editId}`, fd)
        : await api.post("/subcategories", fd);

      toast.success(editId ? "Updated" : "Added");
      setShowForm(false);
      setEditId(null);
      setName("");
      setCategory("");
      setStatus("Active");
      setImage(null);
      setPreview("");
      loadData();
    } catch (err) {
      toast.error("Save failed");
      console.error(err);
    }
  };

 
  const columns = useMemo(
    () => [
      {
        field: "displayId",
        headerName: "ID",
        width: 100,
        renderCell: (p) => p.value ?? p.row._id.slice(-3), 
      },
      {
        field: "image",
        headerName: "Image",
        width: 100,
        sortable: false,
        renderCell: (p) => (
          <div className="w-8 h-8 mx-auto rounded overflow-hidden bg-gray-100">
            <img
              src={
                p.value
                  ? p.value.startsWith("http")
                    ? p.value
                    : `${API_URL}${p.value}`
                  : "/placeholder.png"
              }
              alt="subcategory"
              className="w-full h-full object-cover"
            />
          </div>
        ),
      },
      {
        field: "name",
        headerName: "Sub Category",
        flex: 1,
      },
      {
        field: "categoryName",
        headerName: "Category",
        width: 160,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (p) => (
          <span
            className={
              p.value === "Active"
                ? "text-green-600 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {p.value}
          </span>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        width: 140,
        sortable: false,
        renderCell: (p) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditId(p.row._id);
                setName(p.row.name);
                setCategory(p.row.category);
                setStatus(p.row.status);
                setPreview(p.row.image);
                setShowForm(true);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <PencilIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setDeleteId(p.row._id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <TrashIcon className="w-5 h-5 text-red-500" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Sub Category</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-4 py-2 rounded flex gap-2"
          >
            <PlusIcon className="w-4 h-4" /> Add
          </button>
        </div>

        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r._id}
          autoHeight
          sx={{
            ".MuiDataGrid-columnHeaders": {
              background: "#F2E55C",
              fontWeight: 600,
            },
          }}
        />

       
        {showForm && (
          <div className="bg-white p-6 rounded shadow grid md:grid-cols-3 gap-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <ImageUpload
              onChange={(file) => {
                setImage(file);
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img
                src={
                  preview.startsWith("http") ? preview : `${API_URL}${preview}`
                }
                className="h-10 rounded"
                alt="preview"
              />
            )}

            <div className="col-span-full flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}

     
        {deleteId && (
          <DeleteModal
            title="Delete SubCategory"
            onCancel={() => setDeleteId(null)}
            onConfirm={async () => {
              await api.delete(`/subcategories/${deleteId}`);
              toast.success("Deleted");
              setDeleteId(null);
              loadData();
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
