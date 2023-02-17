import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IChannel } from '@/db/services/channels';
import { Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import styles from "@/styles/Home.module.css";
import { groupBy } from 'lodash';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

enum TrendType {
  BY_SUBS = "by_subs",
  BY_VIEWS = "by_views",
  BY_VIDEO_COUNT = "by_video_count",
}

interface IChartGroupByViewsCategoryProps {
  channels: Array<IChannel>;
}

export const ChartGroupByViewsCategory = ({
  channels = [],
}: IChartGroupByViewsCategoryProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const [trendType, setTrendType] = useState(TrendType.BY_VIEWS);

  const onTypeChange = useCallback((event: SyntheticEvent, type: string) => {
    setTrendType(type as TrendType);
  }, [setTrendType]);

  useEffect(() => {
    const channelsByCategory = groupBy(channels, "category");
    const categories = Object.keys(channelsByCategory);
    const totalByCategory = categories.map(category => {
      const categoryChannels = channelsByCategory[category];
      return categoryChannels.reduce((acc, channel) => ({
        views: acc.views + channel.views,
        subs: acc.subs + channel.subs,
        videoCounts: acc.videoCounts + channel.videoCounts,
      }), { views: 0, subs: 0, videoCounts: 0 });
    });

    let dataset = {
      label: "Views",
      data: categories.map((_, index) => totalByCategory[index].views),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    };

    if (trendType === TrendType.BY_SUBS) {
      dataset = {
        label: "Subscribers",
        data: categories.map((_, index) => totalByCategory[index].subs),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      };
    }

    if (trendType === TrendType.BY_VIDEO_COUNT) {
      dataset = {
        label: "Number of Videos",
        data: categories.map((_, index) => totalByCategory[index].videoCounts),
        backgroundColor: 'rgba(53, 162, 135, 0.5)',
      };
    }
    
    const _data = {
      labels: categories,
      datasets: [
        dataset
      ]
    };
    setChartData(_data);
  }, [channels, setChartData, trendType]);
  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div">
        Categories Trend
      </Typography>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Select trend type</FormLabel>
        <RadioGroup
          style={{flexDirection: "row"}}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={TrendType.BY_VIEWS}
          onChange={onTypeChange}
          name="radio-buttons-group"
        >
          <FormControlLabel value={TrendType.BY_VIEWS} control={<Radio />} label="By Views" />
          <FormControlLabel value={TrendType.BY_SUBS} control={<Radio />} label="By Subscribers" />
          <FormControlLabel value={TrendType.BY_VIDEO_COUNT} control={<Radio />} label="By Number of Videos" />
        </RadioGroup>
      </FormControl>
      {chartData !== null && <Bar height={100} options={options} data={chartData} />}
    </Card>
  );
};
