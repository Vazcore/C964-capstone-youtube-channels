import { Box, Slider as SliderUI } from "@mui/material";
import React, { SyntheticEvent } from "react";

interface ISliderProps {
  step: number;
  min: number;
  max: number;
  defaultValue: number;
  isDisabled?: boolean;
  onValueText: (n: number) => string;
  onChange: (event: Event, value: number | number[], active: number) => void;
}

export const Slider = ({
  step,
  min,
  max,
  defaultValue,
  onValueText,
  onChange,
  isDisabled = false,
}: ISliderProps) => {
  return (
    <Box sx={{ width: 300 }}>
      <SliderUI
        aria-label="Custom marks"
        defaultValue={defaultValue}
        getAriaValueText={onValueText}
        step={step}
        min={min}
        max={max}
        disabled={isDisabled}
        onChange={onChange}
        valueLabelFormat={onValueText}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default Slider;
