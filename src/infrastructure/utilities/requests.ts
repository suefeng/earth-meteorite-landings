import { Dispatch, SetStateAction, cache } from "react";
import { FAVORITES_MUTATION_URL } from "../consts";
import { MeteoriteType } from "@/domain/entities/meteorite";
import _ from "lodash";

export const getCachedData = cache(
  async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);

    if (!response.ok) {
      const data = await response.json();
      const message = data.error || "Failed to fetch data";
      throw new Error(message);
    }

    return response.json();
  }
);

export const getData = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const data = await response.json();
    const message = data.error || "Failed to fetch data";
    throw new Error(message);
  }

  return response.json();
};

export const formattedData = (data: MeteoriteType[]) => {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    nametype: item.nametype,
    recclass: item.recclass,
    mass: item.mass,
    fall: item.fall,
    year: item.year ? new Date(item.year).getFullYear() : undefined,
    reclat: item.reclat,
    reclong: item.reclong,
    geolocation: item.geolocation ? item.geolocation.coordinates : "",
  }));
};

export const geoCoordinates = (data: MeteoriteType[]) => {
  return {
    geolocation: data.map((item) =>
      item.geolocation ? item.geolocation.coordinates : []
    ),
  };
};

export const groupByYear = (data: MeteoriteType[]) => {
  const years = data.map((item) =>
    item.year ? new Date(item.year).getFullYear() : 0
  );
  const filteredYears = _.remove(years, function (number: number) {
    return number.toString().length > 3;
  });
  const sortedYears = _.sortBy(filteredYears);
  const yearsNoRepeat = _.uniq(sortedYears);
  const yearData = _.countBy(sortedYears);
  console.log(yearsNoRepeat);
  return { count: yearData, years: yearsNoRepeat };
};

export const formattedMeteoriteData = async (
  url: string,
  options?: RequestInit,
  cache: boolean = false
) => {
  const data: MeteoriteType[] = cache
    ? await getCachedData(url, options)
    : await getData(url, options);
  return formattedData(data);
};

export const favoritesMutation = (
  dataId: string,
  userId: string,
  requestType: string,
  ref: any,
  setMessage: Dispatch<
    SetStateAction<
      { text: string; type: "success" | "error" | undefined } | undefined
    >
  >
) => {
  const requestData = {
    meteorite_id: dataId,
    user_id: userId,
  };
  const requestUrl = FAVORITES_MUTATION_URL(requestType, requestData);
  const options = {
    method: requestType === "create" ? "POST" : "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };
  const response = getData(requestUrl, options);
  response
    .then((data) => {
      setMessage({ text: data.message, type: "success" });
      setTimeout(() => {
        if (requestType === "delete") {
          ref.updateRows([{ id: dataId, _action: "delete" }]);
        } else {
          ref.setRowSelectionModel([]); // clear selection
        }
      }, 2000);
    })
    .catch((error) => {
      setMessage({ text: error.message, type: "error" });
    });
};
