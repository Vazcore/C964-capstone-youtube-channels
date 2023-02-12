import { connect } from "@/db/connect";
import { saveSimpleLinearRegressionFormula } from "@/db/services/regression";
import { readCSVDataset } from "@/helpers/server-utils";
import { SLR } from "@/helpers/simple-linear-regression";
import { getRandomArbitrary } from "@/helpers/utils";
import { get } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();
  // Read Dataset
  const dataset = await readCSVDataset("topSubscribed.csv");
  /**
   * Calculate Simple Linear Regression
   */
  const slr = new SLR(dataset);
  /**
   * Record to the databse a formula
   */
  await saveSimpleLinearRegressionFormula(JSON.stringify(slr.regression.toJSON()));

  return res.status(200).json({ status: "success"});
}