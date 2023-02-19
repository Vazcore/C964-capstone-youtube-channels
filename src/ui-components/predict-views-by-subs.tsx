import React, { useState } from "react";
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


const defaultChartData = {
  labels: [],
  datasets: [
    {
      label: "Views prediction",
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(155, 199, 132, 0.5)",
    }
  ],
};;

export const PredictViewsBySubs = () => {
  const [selectedValue, setSelectedValue] = useState(5000);
  const [ predictedNumberOfViews, setPredictedNumberOfViews ] = useState<number>(0);
  const [ sliderDisabled, setSliderDisabled ] = useState(false);
  const [ chartData, setChartData ] = useState<ChartData<"line"> | null>(null);
  const [ predictedYears, setPredictedYears ] = useState<number>(5);
  const [ predictedSubsPerYear, setPredictedSubsPerYear ] = useState(7000000);

  const setPredictionChart = async (
    subs: number,
    years = predictedYears,
    subsPerYear = predictedSubsPerYear,
  ) => {
    setChartData(null as unknown as ChartData<"line">);
    setSliderDisabled(true);
    let response;
    if (isMockEnabled) {
      response = mockPredictSlrByYears;
    } else {
      response = await axios({
        method: "GET",
        url: `${clientUrls.FETCH_PREDICT_BULK_SLR}?subs=${subs}&years=${years}&subsPerYear=${subsPerYear}`,
      });
    }
    
    const _chartData = {
      ...defaultChartData,
      labels: Array(years).fill(0).map((_, i) => "Year #" + String(i + 1)),
      datasets: [
        {
          label: "Views prediction",
          data: response.data.views,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(155, 199, 132, 0.5)",
        }
      ],
    };
    setChartData(_chartData);
    setSliderDisabled(false);
  };

  const fetchForResult = async (subs: number) => {
    setSliderDisabled(true);
    let result;
    if (isMockEnabled) {
      result = mockedViewsPrediction;
    } else {
      const response = await axios({
        method: "GET",
        url: `${clientUrls.FETCH_PREDICT_SLR}?subs=${subs}`
      });
      result = Number(response.data.y);
    }
    
    setPredictedNumberOfViews(result);
    setPredictionChart(subs);
    setSliderDisabled(false);
  };
  
  const onSliderChange = (event: Event, val: number | number[]) => {
    setSelectedValue(Number(val));
    fetchForResult(Number(val));
  };
  const onSliderYearChange = (event: Event, val: number | number[]) => {
    setPredictedYears(Number(val));
    setPredictionChart(selectedValue, Number(val));
  };
  const onSliderSubsPerYearChange = (event: Event, val: number | number[]) => {
    setPredictedSubsPerYear(Number(val));
    setPredictionChart(selectedValue, predictedYears, Number(val));
  };
  const debouncedOnSliderChange = debounce(onSliderChange, 500);
  const debouncedOnSliderYearChange = debounce(onSliderYearChange, 500);
  const debouncedOnSliderSubsPerYearChange = debounce(onSliderSubsPerYearChange, 500);
  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div" className={styles.sectionTitle}>
        Predict views by the number of subscriptions
      </Typography>
      <div className={styles.flexBlock}>
        <div className={styles.blockPadding}>
          <Typography gutterBottom variant="h6" component="div">
            Please select a value on the slider
          </Typography>
          <Slider step={10000}
            min={7000000}
            max={200000000}
            isDisabled={sliderDisabled}
            defaultValue={7000000}
            onChange={debouncedOnSliderChange}
            onValueText={formatNumber}
          />
          <p>Selected number of subscribers: {formatNumber(selectedValue)}</p>
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
                    <p>Based on the {formatNumber(predictedNumberOfViews)} views that was predicted according to the {formatNumber(selectedValue)} subscribers. In the next {predictedYears} years we can predict the number of views</p>
                    <div className={styles.flexBlock}>
                      <div className={styles.blockPadding}>
                        <Slider step={1}
                          min={1}
                          max={20}
                          isDisabled={sliderDisabled}
                          defaultValue={predictedYears}
                          onChange={debouncedOnSliderYearChange}
                          onValueText={formatNumber}
                        />
                        <p>Number of years: {predictedYears}</p>
                      </div>

                      <div className={styles.blockPadding}>
                        <Slider step={1000}
                          min={10000}
                          max={20000000}
                          isDisabled={sliderDisabled}
                          defaultValue={predictedSubsPerYear}
                          onChange={debouncedOnSliderSubsPerYearChange}
                          onValueText={formatNumber}
                        />
                        <p>Subscribers increase rate per year: {formatNumber(predictedSubsPerYear)}</p>
                      </div>
                    </div>
                    
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

export default PredictViewsBySubs;
