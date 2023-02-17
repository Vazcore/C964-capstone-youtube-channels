import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { IChannel } from "@/db/services/channels";
import { ScatterChart } from "./charts/scatter-chart";

interface IChartSubscribersPerViewsProps {
  channels: Array<IChannel>;
}

export const ChartSubscribersPerViews = ({
  channels = [],
}: IChartSubscribersPerViewsProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Subscribers",
        }
      },
      x: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Number of views",
        }
      },
    },
  };
  useEffect(() => {
    const data = {
      datasets: [
        {
          label: "",
          data: channels.filter(channel => channel.views <= 25000000000 && channel.subs <= 50000000).map(channel => ({
            x: channel.views,
            y: channel.subs,
          })),
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };
    setChartData(data);
  }, [channels, setChartData]);
  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div">
        Youtube subscribers per views (scatter plot)
      </Typography>
      {chartData !== null && <ScatterChart options={options} data={chartData} />}
    </Card>
  );
};

export default ChartSubscribersPerViews;
