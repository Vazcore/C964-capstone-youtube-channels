import { connect } from "@/db/connect";
import { getMLRFormula } from "@/db/services/regression";
import { MVLR } from "@/helpers/multivariant-linear-regression";
import { get, first } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();

  const x1 = get(req, "query.subs", 0);
  const x2 = get(req, "query.videoCounts", 0);
  
  if (x1 === 0 || x2 === 0) {
    return res.status(200).json({ status: "failed"}); 
  }
  const formula = await getMLRFormula();
  const y = MVLR.predict(formula, [Number(x1), Number(x2)]);
  return res.status(200).json({ status: "success", y: first(y)});
}