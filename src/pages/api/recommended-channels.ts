import { connect } from "@/db/connect";
import { getRecommendedVideos } from "@/db/services/similar-channels";
import { get } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();
  const channelId = get(req, "query.id", null);
  if (channelId === null) {
    return res.status(200).json({ status: "success", message: "Channel doesn't exist"});
  }
  const data = await getRecommendedVideos(Number(channelId));
  return res.status(200).json({ status: "success", data});
}
