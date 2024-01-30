import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { MedeoriteFormattedType } from "@/domain/entities/medeorite";

export default function DataTable({
  rows,
  columns,
}: {
  rows: MedeoriteFormattedType[];
  columns: GridColDef[];
}) {
  return (
    <div className="max-w-100" style={{ height: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection
      />
    </div>
  );
}
