import { Card, Typography } from "@mui/material";
import React from "react";
import Progress from "./progress";
import styles from "@/styles/Home.module.css";

export const CardProgress = () => {
  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div">
        Please wait ...
      </Typography>
      <Progress />
    </Card>
  );
};

export default CardProgress;
