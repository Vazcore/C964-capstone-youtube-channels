import { connect } from "@/db/connect";
import { getAllChannels } from "@/db/services/channels";
import { get } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await connect();
  const from = Number(get(req, "query.from", 0));
  const channels = await getAllChannels(from);
  return res.status(200).json({ status: "success", data: channels});
}
