import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import styles from "@/styles/Home.module.css";
import Typography from "@mui/material/Typography";
import { IChannel } from "@/db/services/channels";
import axios from "axios";
import { clientUrls } from "@/helpers/client-urls";
import { get } from "lodash";
import ChannelCard from "./channel-card";

export const ChannelRecommendation = () => {
  const [channels, setChannels] = useState<Array<IChannel>>([]);
  const [ recommendedChannels, setRecommendedChannels ] = useState([]);

  const fetchVideos = useCallback(async (from = 0) => {
    const response = await axios({
      method: "GET",
      url: `${clientUrls.FETCH_CHANNELS}?from=${from}`
    });
    setChannels(get(response, "data.data", []) as Array<IChannel>);
  }, [setChannels]);

  const fetchRecommendations = useCallback(async (id: number) => {
    const response = await axios({
      method: "GET",
      url: `${clientUrls.FETCH_RECOMMENDATIONS}?id=${id}`
    });
    setRecommendedChannels(get(response, "data.data", []));
  }, [setRecommendedChannels]);
  
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div">
        Youtube Channel Recomendation
      </Typography>
      <div className={styles.channelsContainer}>
        {channels && channels.map(channel => (
          <ChannelCard channel={channel} fetchRecommendations={fetchRecommendations} />
        ))}
      </div>
      <Button variant="contained">Search</Button>
    </Card>
  );
};

export default ChannelRecommendation;

