import { connect } from "@/db/connect";
import { getSimpleLinearRegressionFormula } from "@/db/services/regression";
import { SLR } from "@/helpers/simple-linear-regression";
import { get } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();

  const x = get(req, "query.subs", 0);
  if (x === 0) {
    return res.status(200).json({ status: "failed"}); 
  }
  const formula = await getSimpleLinearRegressionFormula();
  const y = SLR.predict(formula, Number(x));
  return res.status(200).json({ status: "success", y});
};
