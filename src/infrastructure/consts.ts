import { GridColDef } from "@mui/x-data-grid";

export const LINKS = [
  { name: "Home", href: "/" },
  { name: "Geolocations", href: "/geolocations" },
  { name: "Year over year", href: "/year-over-year" },
  { name: "Favorites", href: "/favorites/earthling" },
];
export const TITLE = "Earth Meteorite Landings";
export const NASA_URL = "https://data.nasa.gov/resource/y77d-th95.json";
export const FAVORITES_URL = (username: string) =>
  `http://localhost:3002/api/v1/favorites/${username}`;
export const FAVORITES_MUTATION_URL = (
  requestType: string,
  requestData: { meteorite_id: string; user_id: string }
) =>
  `http://localhost:3002/api/v1/favorites/${requestType}?meteorite_id=${requestData.meteorite_id}&user_id=${requestData.user_id}`;

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "nametype", headerName: "Name Type", width: 110 },
  {
    field: "recclass",
    headerName: "Rec Class",
    width: 110,
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
    width: 80,
  },
  {
    field: "year",
    headerName: "Year",
    type: "string",
    width: 80,
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
    headerName: "Geolocation (point)",
    width: 180,
  },
];

export const REQUEST_ERROR =
  "Something went wrong with the request. Please check back later.";
