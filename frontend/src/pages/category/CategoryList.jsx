import { useEffect, useState } from "react";
import api from "../../services/api";
import ConfirmDeleteModal from "../../components/DeleteModal";


const API_URL = "http://localhost:5000";


const shortId = (id) => id?.slice(-3);

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);


  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Load categories error:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

 
  const confirmDelete = async () => {
    try {
      await api.delete(`/categories/${deleteId}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6">
    
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Category</h1>
        <a
          href="/category/add"
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
        >
          Add Category
        </a>
      </div>

     
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl border table-fixed">
          <thead className="bg-[var(--color-accent)]">
            <tr className="text-center">
              <th className="p-3 w-20">ID</th>
              <th>Category Name</th>
              <th className="w-20">Image</th>
              <th>Status</th>
              <th className="w-24">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No categories found
                </td>
              </tr>
            )}

            {categories.map((cat) => (
              <tr
                key={cat._id}
                className="border-t text-center hover:bg-gray-50"
              >
              
                <td className="font-medium text-gray-700">
                  {shortId(cat._id)}
                </td>

                <td className="truncate">{cat.name}</td>

               
                <td>
                  <div
                    className="w-8 h-8 mx-auto   rounded  overflow-hidden  bg-gray-100 flex items-center justify-center"
                  >
                    <img
                      src={
                        cat.image
                          ? cat.image.startsWith("http")
                            ? cat.image
                            : `${API_URL}${cat.image}`
                          : "/placeholder.png"
                      }
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

               
                <td
                  className={
                    cat.status === "Active"
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {cat.status}
                </td>

             
                <td className="flex justify-center gap-3 py-3">
                  <span className="cursor-pointer">✏️</span>
                  <button
                    onClick={() => setDeleteId(cat._id)}
                    className="text-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
