import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ILineChartProps {
  height?: number;
  width?: number;
  title?: string;
  data: ChartData<"line">;
}

export const LineChart = ({
  width,
  height = 150,
  title = "Subscribers per views",
  data,
}: ILineChartProps) => {
  const labels = [5, 10, 30];

  const options = useMemo(() =>({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }), [title]);

  return (
    <Line
      width={width}
      height={height}
      options={options}
      data={data}
    />
  );
};

export default LineChart;
