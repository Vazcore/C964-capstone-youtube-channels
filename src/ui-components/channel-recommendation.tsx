import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import styles from "@/styles/Home.module.css";
import Typography from "@mui/material/Typography";
import { IChannel } from "@/db/services/channels";
import axios from "axios";
import { clientUrls } from "@/helpers/client-urls";
import { get } from "lodash";
import ChannelsTable from "./channels-table";
import Progress from "./progress";

interface IChannelRecommendationProps {
  channels: Array<IChannel>;
}

export const ChannelRecommendation = ({
  channels = [],
}: IChannelRecommendationProps) => {
  const [ recommendedChannels, setRecommendedChannels ] = useState([]);

  const fetchRecommendations = useCallback(async (id: string) => {
    const response = await axios({
      method: "GET",
      url: `${clientUrls.FETCH_RECOMMENDATIONS}?id=${id}`
    });
    setRecommendedChannels(get(response, "data.data", []));
  }, [setRecommendedChannels]);

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

