import { DatasetColumn, TDataset } from "@/helpers/dataset";
import { createCSVFromArray, readCSVDataset } from "@/helpers/server-utils";
import { google } from "googleapis";
import get from "lodash/get";
import { NextApiRequest, NextApiResponse } from "next";

export const getChannelLogoByTitle = async(title: string) => {
  const key = get(process, "env.GOOGLE_API_KEY", "");
  const youtuber = google.youtube({ version: "v3", key });
  const res = await youtuber.search.list({ key,  type: ["channel"], part: ["snippet"], maxResults: 1, q: title });
  return get(res, "data.items[0].snippet.thumbnails.default.url", "");
};

const getLogosByChannelList = async (channels: TDataset[]) => {
  const promises: Array<Promise<any>> = [];

  channels.forEach((channel) => {
    const id = channel[DatasetColumn.ID];
    promises.push(getChannelLogoByTitle(channel[DatasetColumn.NAME].trim()));
  });
  const logos = await Promise.all(promises);
  return logos;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const csvChannels = await readCSVDataset("topSubscribed.csv");
  const channels = csvChannels.slice(1);
  const logos = await getLogosByChannelList(channels);
  const csvData = logos.map((logo, index) => ({ id: index + 1, logo }));
  createCSVFromArray("channel_thumbnails.csv", csvData);
  res.status(200).json({ status: "Ok"});
};
