import React from "react";
import Card from "@mui/material/Card";
import styles from "@/styles/Home.module.css";
import Typography from "@mui/material/Typography";

export const PredictViewsBySubs = () => {
  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div">
        Predict views by the number of subscriptions
      </Typography>
      
    </Card>
  );
};

export default PredictViewsBySubs;
