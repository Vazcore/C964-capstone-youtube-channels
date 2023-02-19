import React from "react";
import Chip from "@mui/material/Chip";

interface IStatChipProps {
  icon: React.ReactElement;
  label: string;
}

export const StatChip = ({
  icon,
  label,
}: IStatChipProps) => {
  return (
    <>
      <Chip icon={icon} label={label} color="success" variant="outlined" style={{fontSize: "11px"}} />
    </>
  );
};

export default StatChip;
