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
  XMarkIcon,
} from "@heroicons/react/24/outline";


const API_URL = "http://localhost:5000";

export default function Category() {
  const [rows, setRows] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

 
  const loadData = async () => {
    try {
      const res = await api.get("/categories");
      setRows(res.data || []);
    } catch (err) {
      toast.error("Failed to load categories");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const resetForm = () => {
    setEditId(null);
    setName("");
    setStatus("Active");
    setImageFile(null);
    setPreview("");
    setShowForm(false);
  };

  
  const openAdd = () => {
    resetForm();
    setShowForm(true);
  };

 
  const openEdit = (row) => {
    setEditId(row._id);
    setName(row.name);
    setStatus(row.status);
    setPreview(row.image);
    setImageFile(null);
    setShowForm(true);
  };

  
  const handleImageChange = (file) => {
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };


  const saveCategory = async () => {
    if (!name.trim()) return toast.error("Category name is required");
    if (!editId && !imageFile) return toast.error("Image is required");

    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("status", status);
      if (imageFile) fd.append("image", imageFile);

      if (editId) {
        await api.put(`/categories/${editId}`, fd);
        toast.success("Category updated");
      } else {
        await api.post("/categories", fd);
        toast.success("Category added");
      }

      resetForm();
      loadData();
    } catch (err) {
      toast.error("Save failed");
      console.error(err);
    }
  };

 
  const confirmDelete = async () => {
    try {
      await api.delete(`/categories/${deleteId}`);
      toast.success("Category deleted");
      setDeleteId(null);
      loadData();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };


  const columns = useMemo(
    () => [
      {
        field: "displayId",
        headerName: "ID",
        width: 100,
        renderCell: (params) => params.value ?? params.row._id.slice(-3), 
      },
      {
        field: "name",
        headerName: "Category Name",
        flex: 1,
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
              alt="category"
              className="w-full h-full object-cover"
            />
          </div>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        renderCell: (p) => (
          <span
            className={`font-medium ${
              p.value === "Active" ? "text-green-600" : "text-rose-500"
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
          <h1 className="text-lg font-semibold">Category</h1>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded"
          >
            <PlusIcon className="w-4 h-4" />
            Add Category
          </button>
        </div>

    
        <div className="bg-white rounded shadow">
          <div style={{ height: 420 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(r) => r._id}
              pageSizeOptions={[8, 20]}
              initialState={{
                pagination: { paginationModel: { pageSize: 8, page: 0 } },
              }}
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
          <div className="bg-white rounded shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editId ? "Edit Category" : "Add Category"}
              </h2>
              <button onClick={resetForm}>
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm">Category Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Image</label>
                {preview && (
                  <img src={preview} className="h-12 my-2 rounded" alt="" />
                )}
                <ImageUpload onChange={handleImageChange} />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={resetForm} className="px-5 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={saveCategory}
                className="px-6 py-2 bg-primary text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}

   
        {deleteId && (
          <DeleteModal
            title="Delete Category"
            onCancel={() => setDeleteId(null)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
