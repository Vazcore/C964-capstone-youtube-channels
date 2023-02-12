import React, { useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { IChannel } from "@/db/services/channels";
import styles from "@/styles/Home.module.css"

interface IChannelCardProps {
  channel: IChannel;
  fetchRecommendations: (id: number) => void;
}

export const ChannelCard = ({
  channel,
  fetchRecommendations,
}: IChannelCardProps) => {
  const onFetchRecommendations = useCallback(() => {
    fetchRecommendations(channel.id);
  }, [channel]);
  return (
    <Card className={styles.channelCard}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={channel.thumbnail ? channel.thumbnail : "channel-default.jpg"}
      />
      <CardContent>
        <Typography sx={{ fontSize: 15 }} gutterBottom>
          {channel.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onFetchRecommendations}>Get Recommendations</Button>
      </CardActions>
    </Card>
  );
};

export default ChannelCard;