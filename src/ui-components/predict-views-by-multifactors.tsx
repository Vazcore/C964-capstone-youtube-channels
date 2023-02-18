import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import styles from "@/styles/Home.module.css";
import Typography from "@mui/material/Typography";
import Slider from "./slider";
import { formatNumber } from "@/helpers/utils";
import { debounce } from "lodash";
import axios from "axios";
import { clientUrls } from "@/helpers/client-urls";
import CardProgress from "./card-progress";
import { isMockEnabled } from "@/helpers/config";
import { mockedViewsPrediction, mockPredictSlrByYears } from "./__mocks__/mock-predict-slr";
import LineChart from "./charts/line-chart";
import {
  ChartData,
} from "chart.js";
import { mockedMLRViewsPrediction, mockPredictMlrByYears } from "./__mocks__/mock-predict-mlr";


const defaultChartData = {
  labels: [],
  datasets: [
    {
      label: "Views prediction",
      data: [],
      borderColor: "rgba(155, 199, 132, 0.5)",
      backgroundColor: "rgba(155, 199, 132, 0.5)",
    }
  ],
};

export const PredictViewsByMultifactors = () => {
  const [selectedSubs, setSelectedSubs] = useState(10000000);
  const [selectedVideoCounts, setSelectedVideoCounts] = useState(5000);
  const [ predictedNumberOfViews, setPredictedNumberOfViews ] = useState<number>(0);
  const [ sliderDisabled, setSliderDisabled ] = useState(false);
  const [ chartData, setChartData ] = useState<ChartData<"line"> | null>(null);
  const [ predictedYears, setPredictedYears ] = useState<number>(5);
  const [ predictedSubsPerYear, setPredictedSubsPerYear ] = useState(20000);
  const [ predictedVideosPerYear, setPredictedVideosPerYear ] = useState(100);

  const setPredictionChart = async (
    subs: number,
    videoCounts = selectedVideoCounts,
    years = predictedYears,
  ) => {
    setChartData(null as unknown as ChartData<"line">);
    setSliderDisabled(true);
    let response;
    if (isMockEnabled) {
      response = mockPredictMlrByYears;
    } else {
      response = await axios({
        method: "GET",
        url: `${clientUrls.FETCH_PREDICT_BULK_MLR}?subs=${subs}` +
            `&videoCounts=${videoCounts}&years=${years}` +
            `&subsPerYear=${predictedSubsPerYear}` +
            `&videosPerYear=${predictedVideosPerYear}`,
      });
    }
    
    const _chartData = {
      ...defaultChartData,
      labels: Array(years).fill(0).map((_, i) => "Year #" + String(i + 1)),
      datasets: [
        {
          label: "Views prediction",
          data: response.data.views,
          borderColor: "rgba(155, 199, 132, 0.5)",
          backgroundColor: "rgba(155, 199, 132, 0.5)",
        }
      ],
    };
    setChartData(_chartData);
    setSliderDisabled(false);
  };

  const fetchForResult = async (subs = selectedSubs, videoCounts = selectedVideoCounts) => {
    setSliderDisabled(true);
    let result;

    if (isMockEnabled) {
      result = mockedMLRViewsPrediction;
    } else {
      const response = await axios({
        method: "GET",
        url: `${clientUrls.FETCH_PREDICT_MLR}?subs=${subs}&videoCounts=${videoCounts}`
      });
      result = Number(response.data.y);
    }
    
    setPredictedNumberOfViews(result);
    setPredictionChart(subs, videoCounts, predictedYears);
    setSliderDisabled(false);
  };
  
  const onSliderChange = (event: Event, val: number | number[]) => {
    setSelectedSubs(Number(val));
    fetchForResult(Number(val), selectedVideoCounts);
  };
  const onSliderYearChange = (event: Event, val: number | number[]) => {
    setPredictedYears(Number(val));
    setPredictionChart(selectedSubs, selectedVideoCounts,  Number(val));
  };

  const onVideoCountsChange = (event: Event, val: number | number[]) => {
    setSelectedVideoCounts(Number(val));
    fetchForResult(selectedSubs, Number(val));
  };
  const debouncedOnSliderChange = debounce(onSliderChange, 500);
  const debouncedOnSliderYearChange = debounce(onSliderYearChange, 500);
  const debouncedOnSliderVideoCountsChange = debounce(onVideoCountsChange, 500);
  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div" className={styles.sectionTitle}>
      <strong>(Multifactors)</strong> Predict views by the number of subscriptions and the number of uploaded videos
      </Typography>
      <div className={styles.flexBlock}>
        <div className={styles.blockPadding}>
          <Typography gutterBottom variant="h6" component="div">
            Please select a number of subscribers on the slider
          </Typography>
          <Slider step={10000}
            min={7000000}
            max={200000000}
            isDisabled={sliderDisabled}
            defaultValue={7000000}
            onChange={debouncedOnSliderChange}
            onValueText={formatNumber}
          />
          <p>Selected number of subscribers: {formatNumber(selectedSubs)}</p>
          <br />
          <br />
          <Typography gutterBottom variant="h6" component="div">
            Please select a number of uploaded videos on the slider
          </Typography>
          <Slider step={100}
            min={1000}
            max={100000}
            isDisabled={sliderDisabled}
            defaultValue={200}
            onChange={debouncedOnSliderVideoCountsChange}
            onValueText={formatNumber}
          />
          <p>Selected number of uploaded videos: {formatNumber(selectedVideoCounts)}</p>
        </div>
        <div className={styles.blockPadding}>
          {sliderDisabled && <CardProgress />}
          {!sliderDisabled && predictedNumberOfViews > 0 && (
            <div>
              <Typography gutterBottom variant="h6" component="div">
                Predicted number of views: <strong className={styles.underline}>
                  {formatNumber(predictedNumberOfViews)}
                </strong>
              </Typography>
              <div>
                {chartData === null && <CardProgress />}
                {chartData !== null && (
                  <>
                    <p>Based on the {formatNumber(predictedNumberOfViews)} views that was predicted according to the {formatNumber(selectedSubs)} subscribers and {formatNumber(selectedVideoCounts)} uploaded videos. In the next {predictedYears} years we can predict the number of views</p>
                    <Slider step={1}
                      min={1}
                      max={20}
                      isDisabled={sliderDisabled}
                      defaultValue={predictedYears}
                      onChange={debouncedOnSliderYearChange}
                      onValueText={formatNumber}
                    />
                    <p>Number of years: {predictedYears}</p>
                    <LineChart data={chartData}
                      width={800}
                      height={400}
                      title={`Views prediction in ${predictedYears} year(s)`} />
                  </>
                )}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </Card>
  );
};

export default PredictViewsByMultifactors;

