import DataTable from "@/components/DataTable";
import { formattedMeteoriteData } from "@/infrastructure/utilities/requests";
import { NASA_URL, columns, REQUEST_ERROR } from "@/infrastructure/consts";

export default async function Home() {
  const url = NASA_URL;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const rowsData = await formattedMeteoriteData(url, options, true).catch(
    (error) => {
      return;
    }
  );

  return (
    <>
      <p className="mb-4">
        This comprehensive data set from The Meteoritical Society contains
        information on all of the known meteorite landings from NASA's Open Data
        Portal
      </p>
      <p className="mb-4">
        To save a meteorite to your favorites, click on a checkmark and click on
        "Save to favorites".
      </p>
      {typeof rowsData === "object" ? (
        <DataTable
          rows={rowsData}
          columns={columns}
          userId="1"
          requestType="create"
        />
      ) : (
        <p>{REQUEST_ERROR}</p>
      )}
    </>
  );
}
