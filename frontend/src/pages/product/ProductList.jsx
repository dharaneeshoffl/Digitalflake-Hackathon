import { useEffect, useState } from "react";
import api from "../../services/api";
import ConfirmDeleteModal from "../../components/DeleteModal";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
     
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Product</h1>
        <a
          href="/product/add"
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
        >
          Add New
        </a>
      </div>

     
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl border table-fixed">
          <thead className="bg-[var(--color-accent)]">
            <tr className="text-center">
              <th className="p-3 w-12">#</th>
              <th>Product Name</th>
              <th className="w-24">Image</th>
              <th>Sub Category</th>
              <th>Category</th>
              <th>Status</th>
              <th className="w-24">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}

            {data.map((p, i) => (
              <tr key={p._id} className="border-t text-center hover:bg-gray-50">
                <td className="p-3">{i + 1}</td>

                <td className="truncate">{p.name}</td>

            
                <td>
                  <div className="w-10 h-10 mx-auto rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td className="truncate">{p.subCategoryName}</td>
                <td className="truncate">{p.categoryName}</td>

                <td
                  className={
                    p.status === "Active"
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {p.status}
                </td>

                <td className="flex justify-center gap-3 py-3">
                  <span className="cursor-pointer">✏️</span>
                  <button
                    onClick={() => setDeleteId(p._id)}
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
        onConfirm={() => {
          api.delete(`/products/${deleteId}`);
          setData((prev) => prev.filter((i) => i._id !== deleteId));
          setDeleteId(null);
        }}
      />
    </div>
  );
}
