"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowSelectionModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { favoritesMutation } from "@/infrastructure/utilities/requests";
import { Toast } from "@/components/Toast";

export default function DataTable({
  rows,
  columns,
  userId,
  requestType,
}: {
  rows: any[];
  columns: GridColDef[];
  userId: string;
  requestType: "create" | "delete";
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mobileMode = useMediaQuery("(max-width: 600px)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | undefined;
  }>();

  const apiRef = useGridApiRef();

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    if (!!rowSelectionModel && rowSelectionModel.length > 0 && apiRef.current) {
      favoritesMutation(
        rowSelectionModel.toString(),
        userId,
        requestType,
        apiRef.current,
        setMessage
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {mobileMode ? (
        "test"
      ) : (
        <>
          {console.log(message)}
          {message && (
            <Toast open={true} message={message.text} type={message.type} />
          )}
          <DataGrid
            apiRef={apiRef}
            rows={rows}
            onRowSelectionModelChange={handleSelectionChange}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 50 },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            checkboxSelection
          />
        </>
      )}
    </ThemeProvider>
  );
}
