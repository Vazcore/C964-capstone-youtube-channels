import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { IChannel } from "@/db/services/channels";
import styles from "@/styles/Home.module.css"
import StatChip from "./state-chip";
import AutoGraph from "@mui/icons-material/AutoGraph";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { shortenNumber } from "@/helpers/utils";

interface IChannelCardProps {
  channel: IChannel;
}

export const ChannelCard = ({
  channel,
}: IChannelCardProps) => {
  return (
    <Card className={styles.channelCard}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={channel.thumbnail ? channel.thumbnail : "channel-default.jpg"}
      />
      <CardContent>
        <Typography sx={{ fontSize: 15, fontWeight: "bold" }} gutterBottom>
          {channel.name}
        </Typography>
        <div className={styles.sectionTitle} style={{fontSize: "14px"}}>Category: <b>{channel.category}</b></div>
        <Typography sx={{ fontSize: 12}} gutterBottom>Based on</Typography>

        <div className={styles.flexBlock}>
          <div className={styles.cardStat}>
            <StatChip icon={<AutoGraph />} label={"Views: " + shortenNumber(channel.views)} />
          </div>
          <div className={styles.cardStat}>
            <StatChip icon={<GroupAddIcon />} label={"Subs: " + shortenNumber(channel.subs)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;