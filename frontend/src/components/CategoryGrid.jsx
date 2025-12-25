import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";

export default function CategoryGrid({ data }) {
  const columns = [
    { field: "name", headerName: "Category Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: () => (
        <span className="text-green-600 font-medium">Active</span>
      ),
    },
  ];

  const rows = useMemo(
    () =>
      data.map((item, index) => ({
        id: item._id || index,
        name: item.name,
      })),
    [data]
  );

  return (
    <div style={{ height: 420, width: "100%", background: "#fff" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}
