"use client";

import { SetStateAction, useState } from "react";

import DataTable from "@/components/DataTable";

import { GridColDef } from "@mui/x-data-grid";

import {
  MedeoriteType,
  MedeoriteFormattedType,
} from "@/domain/entities/medeorite";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "nametype", headerName: "Name Type", width: 130 },
  {
    field: "recclass",
    headerName: "Rec Class",
    width: 90,
  },
  {
    field: "mass",
    headerName: "Mass (g)",
    type: "number",
    width: 90,
  },
  {
    field: "fall",
    headerName: "Fall",
    width: 90,
  },
  {
    field: "year",
    headerName: "Year",
    type: "string",
    width: 90,
  },
  {
    field: "reclat",
    headerName: "Rec latitude",
    type: "number",
    width: 130,
  },
  {
    field: "reclong",
    headerName: "Rec longitude",
    type: "number",
    width: 130,
  },
  {
    field: "geolocation",
    headerName: "Geolocation",
    width: 400,
  },
];

async function getData() {
  const response = await fetch("https://data.nasa.gov/resource/y77d-th95.json");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

const formattedMedeoriteData = async (
  setRowsData: React.Dispatch<SetStateAction<MedeoriteFormattedType[]>>
) => {
  const data: MedeoriteType[] = await getData();
  const formattedData: MedeoriteFormattedType[] = [];
  data.map((item) => {
    formattedData.push({
      id: item.id,
      name: item.name,
      nametype: item.nametype,
      recclass: item.recclass,
      mass: item.mass,
      fall: item.fall,
      year: item.year ? new Date(item.year).getFullYear() : undefined,
      reclat: item.reclat,
      reclong: item.reclong,
      geolocation: item.geolocation
        ? `type: ${item.geolocation.type}, latitude: ${item.geolocation.coordinates[0]}, longitude: ${item.geolocation.coordinates[1]}`
        : "",
    });
  });
  setRowsData(formattedData);
};

export default function Home() {
  const [rowsData, setRowsData] = useState<MedeoriteFormattedType[]>([]);

  rowsData.length > 0 ? rowsData : formattedMedeoriteData(setRowsData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">Earth Meteorite Landings</h1>
        {rowsData && <DataTable rows={rowsData} columns={columns} />}
      </div>
    </main>
  );
}
