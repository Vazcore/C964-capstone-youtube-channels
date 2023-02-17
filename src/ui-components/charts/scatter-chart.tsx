import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  PluginChartOptions,
  ChartData,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "",
      data: Array.from({ length: 100 }, () => ({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

interface IScatterChartProps {
  options: object;
  data: ChartData<"scatter">;
}

export const ScatterChart = ({
  options,
  data,
}: IScatterChartProps) => {
  return <Scatter height={100} options={options} data={data} />;
};
