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
  height: number;
  title?: string;
}

export const LineChart = ({
  height = 150,
  title = "Subscribers per views",
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
        text: "Subscribers per views",
      },
    },
  }), [title]);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => 1),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ],
  };
  return (
    <Line
      height={height}
      options={options}
      data={data}
    />
  );
};

export default LineChart;
