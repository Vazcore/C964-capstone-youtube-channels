import React, { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import styles from "@/styles/Home.module.css";
import Typography from "@mui/material/Typography";
import { IChannel } from "@/db/services/channels";
import axios from "axios";
import { clientUrls } from "@/helpers/client-urls";
import { get } from "lodash";
import ChannelsTable from "./channels-table";
import Progress from "./progress";
import { isMockEnabled } from "@/helpers/config";
import { mockedRecommendedChannels } from "./__mocks__/mock-recommended-channels";

interface IChannelRecommendationProps {
  channels: Array<IChannel>;
}

export const ChannelRecommendation = ({
  channels = [],
}: IChannelRecommendationProps) => {
  const [ recommendedChannels, setRecommendedChannels ] = useState([]);

  const fetchRecommendations = useCallback(async (id: string) => {
    let response;
    if (isMockEnabled) {
      response = {data: mockedRecommendedChannels};
    } else {
      response = await axios({
        method: "GET",
        url: `${clientUrls.FETCH_RECOMMENDATIONS}?id=${id}`
      });
    }
    setRecommendedChannels(get(response, "data.data", []));
  }, [setRecommendedChannels]);

  return (
    <Card sx={{minWidth: "85%"}} className={styles.mainWrapper}>
      <Typography gutterBottom variant="h5" component="div">
        {"Pick your favourite channel and we\'ll find you something similar"}
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
      </div>
    </Card>
  );
};

export default ChannelRecommendation;

