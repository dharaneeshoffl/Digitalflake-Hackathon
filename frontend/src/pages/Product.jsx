import { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import DeleteModal from "../components/DeleteModal";
import ImageUpload from "../components/ImageUpload";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000";

export default function Product() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [status, setStatus] = useState("Active");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

 
  const loadData = async () => {
    try {
      const [prod, cat, sub] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
        api.get("/subcategories"),
      ]);
      setRows(prod.data || []);
      setCategories(cat.data || []);
      setSubcategories(sub.data || []);
    } catch (err) {
      toast.error("Failed to load data");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  
  const resetForm = () => {
    setEditId(null);
    setName("");
    setCategoryId("");
    setSubCategoryId("");
    setStatus("Active");
    setImageFile(null);
    setPreview("");
    setShowForm(false);
  };

 
  const openEdit = (row) => {
    setEditId(row._id);
    setName(row.name);
    setCategoryId(row.category);
    setSubCategoryId(row.subcategory);
    setStatus(row.status);
    setPreview(row.image);
    setImageFile(null);
    setShowForm(true);
  };

 
  const saveProduct = async () => {
    if (!name || !categoryId || !subCategoryId) {
      return toast.error("All fields required");
    }

    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("category", categoryId);
      fd.append("subcategory", subCategoryId);
      fd.append("status", status);
      if (imageFile) fd.append("image", imageFile);

      editId
        ? await api.put(`/products/${editId}`, fd)
        : await api.post("/products", fd);

      toast.success(editId ? "Product updated" : "Product added");
      resetForm();
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
        width: 90,
        renderCell: (p) => p.value ?? p.row._id.slice(-3), 
      },
      {
        field: "image",
        headerName: "Image",
        width: 90,
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
              alt="product"
              className="w-full h-full object-cover"
            />
          </div>
        ),
      },
      {
        field: "name",
        headerName: "Product",
        flex: 1,
      },
      {
        field: "categoryName",
        headerName: "Category",
        width: 140,
      },
      {
        field: "subCategoryName",
        headerName: "Sub Category",
        width: 160,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (p) => (
          <span
            className={`font-medium ${
              p.value === "Active" ? "text-green-600" : "text-red-500"
            }`}
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
        renderCell: (params) => (
          <div className="flex gap-2">
            <button
              onClick={() => openEdit(params.row)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <PencilSquareIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setDeleteId(params.row._id)}
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
          <h1 className="text-lg font-semibold">Product</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-4 py-2 rounded flex gap-2"
          >
            <PlusIcon className="w-4 h-4" /> Add
          </button>
        </div>

      
        <div className="bg-white rounded shadow overflow-x-auto">
          <div style={{ height: 420, minWidth: 800 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(r) => r._id}
              sx={{
                border: "none",
                ".MuiDataGrid-columnHeaders": {
                  background: "#F2E55C",
                  fontWeight: 600,
                },
              }}
            />
          </div>
        </div>

        
        {showForm && (
          <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              <option value="">Sub Category</option>
              {subcategories
                .filter((s) => s.category?._id === categoryId)
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
            </select>

            <select
              className="border p-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <ImageUpload
              onChange={(file) => {
                setImageFile(file);
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
              <button onClick={resetForm} className="border px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}

        
        {deleteId && (
          <DeleteModal
            title="Delete Product"
            onCancel={() => setDeleteId(null)}
            onConfirm={async () => {
              await api.delete(`/products/${deleteId}`);
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
