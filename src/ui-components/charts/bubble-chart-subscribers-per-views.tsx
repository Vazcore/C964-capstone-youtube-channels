import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bubble } from "react-chartjs-2";


ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export const data = {
  datasets: [
    {
      label: "Red dataset",
      data: Array.from({ length: 50 }, () => ({
        x: 2,
        y: 3,
        r: 4
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  ]
};


export const SubscribersPerViewsBubbleChart = () => {
  return (
    <Bubble options={options} data={data} />
  );
};

export default SubscribersPerViewsBubbleChart;
