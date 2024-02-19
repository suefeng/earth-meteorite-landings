"use client";
import { useEffect, useState, Suspense } from "react";
import DataTable from "@/components/DataTable";
import { FAVORITES_URL, columns, REQUEST_ERROR } from "@/infrastructure/consts";
import { formattedData } from "@/infrastructure/utilities/requests";

export default function Favorites() {
  const [rowsData, setRowsData] = useState<any[]>();
  const url = FAVORITES_URL("earthling");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const formattedMeteoriteData = formattedData(data);
        setRowsData(formattedMeteoriteData);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl">Favorites</h2>
      <p className="my-4">Meteorite landings that you have saved.</p>
      {rowsData ? (
        <DataTable
          rows={rowsData}
          columns={columns}
          userId="1"
          requestType="delete"
        />
      ) : (
        <p>{REQUEST_ERROR}</p>
      )}
    </>
  );
}
