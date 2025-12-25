import { useEffect, useState } from "react";
import api from "../../services/api";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function SubCategoryList() {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    api.get("/subcategories").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Sub Category</h1>
        <a
          href="/subcategory/add"
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg"
        >
          Add New
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl">
          <thead className="bg-[var(--color-accent)]">
            <tr>
              <th className="p-3">ID</th>
              <th>Sub Category name</th>
              <th>Category name</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, i) => (
              <tr key={s._id} className="border-t text-center">
                <td className="p-3">{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.categoryName}</td>
                <td>
                  <img src={s.image} className="h-10 mx-auto" />
                </td>
                <td
                  className={
                    s.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {s.status}
                </td>
                <td className="flex justify-center gap-3 py-3">
                  ✏️
                  <button onClick={() => setDeleteId(s._id)}>🗑️</button>
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
          api.delete(`/subcategories/${deleteId}`);
          setData(prev => prev.filter(i => i._id !== deleteId));
          setDeleteId(null);
        }}
      />
    </div>
  );
}
