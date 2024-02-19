import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export const DataChart = ({
  seriesData,
  xAxisData,
  xAxisScaleType = "band",
}: {
  seriesData: number[];
  xAxisData: string[];
  xAxisScaleType?:
    | "band"
    | "time"
    | "linear"
    | "point"
    | "log"
    | "pow"
    | "sqrt"
    | "utc";
}) => {
  return (
    <BarChart
      series={[{ data: seriesData }]}
      height={290}
      xAxis={[{ data: xAxisData, scaleType: xAxisScaleType }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};
