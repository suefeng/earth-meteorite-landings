"use client";
import React, { useEffect, useState } from "react";
import { groupByYear } from "@/infrastructure/utilities/requests";
import { NASA_URL } from "@/infrastructure/consts";
import { DataChart } from "@/components/DataChart";

export default function YearOverYear() {
  const [seriesData, setSeriesData] = useState<any>();
  const [xAxisData, setXAxisData] = useState<any>();

  useEffect(() => {
    if (
      !localStorage.getItem("seriesData") ||
      !localStorage.getItem("xAxisData")
    ) {
      const url = NASA_URL;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const yearData = groupByYear(data);
          const seriesDataCount = yearData && yearData.count;
          const seriesDataYears = yearData && yearData.years;
          const getSeriesData = yearData && Object.values(seriesDataCount);
          const getXAxisData =
            yearData && getSeriesData ? Object.values(seriesDataYears) : [];
          setSeriesData(getSeriesData);
          setXAxisData(getXAxisData);
          localStorage.setItem("seriesData", JSON.stringify(getSeriesData));
          localStorage.setItem("xAxisData", JSON.stringify(getXAxisData));
        });
    } else {
      const getSeriesData = localStorage.getItem("seriesData") || "[]";
      const getXAxisData = localStorage.getItem("xAxisData") || "[]";
      setSeriesData(JSON.parse(getSeriesData));
      setXAxisData(JSON.parse(getXAxisData));
    }
  }, []);

  return (
    <div>
      <h1>Year Over Year</h1>
      {seriesData && (
        <DataChart
          seriesData={seriesData}
          xAxisData={xAxisData}
          xAxisScaleType="band"
        />
      )}
    </div>
  );
}
