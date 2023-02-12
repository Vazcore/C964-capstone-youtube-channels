import { connect } from "@/db/connect";
import { saveMLRFormula } from "@/db/services/regression";
import { MVLR } from "@/helpers/multivariant-linear-regression";
import { readCSVDataset } from "@/helpers/server-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();

  // Read Dataset
  const dataset = await readCSVDataset("topSubscribed.csv");
  const mlr = new MVLR(dataset);
  await saveMLRFormula(JSON.stringify(mlr.regression.toJSON()));
  return res.status(200).json({ status: "success"});
}
