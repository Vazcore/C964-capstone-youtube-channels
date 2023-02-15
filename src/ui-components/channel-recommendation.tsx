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
import ChannelsTable from "./channels-table";
import Progress from "./progress";

export const ChannelRecommendation = () => {
  const [channels, setChannels] = useState<Array<IChannel>>([]);
  const [ recommendedChannels, setRecommendedChannels ] = useState([]);

  const fetchChannels = useCallback(async (from = 0) => {
    const response = await axios({
      method: "GET",
      url: `${clientUrls.FETCH_CHANNELS}?from=${from}&to=1000`
    });
    setChannels(get(response, "data.data", []) as Array<IChannel>);
  }, [setChannels]);

  const fetchRecommendations = useCallback(async (id: string) => {
    const response = await axios({
      method: "GET",
      url: `${clientUrls.FETCH_RECOMMENDATIONS}?id=${id}`
    });
    setRecommendedChannels(get(response, "data.data", []));
  }, [setRecommendedChannels]);
  
  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div">
        Youtube Channel Recommendation
      </Typography>
      <div className={styles.channelsContainer}>
        {channels.length === 0 && <Progress />}
        {channels.length !== 0 && (
          <ChannelsTable
            channels={channels}
            recommendedChannels={recommendedChannels}
            fetchRecommendedChannels={fetchRecommendations}
          />
        )}
        
        {/* {channels && channels.map(channel => (
          <ChannelCard key={channel._id} channel={channel} fetchRecommendations={fetchRecommendations} />
        ))} */}
      </div>
    </Card>
  );
};

export default ChannelRecommendation;

