import { connect } from "@/db/connect";
import { getMLRFormula } from "@/db/services/regression";
import { MVLR } from "@/helpers/multivariant-linear-regression";
import { get } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await connect();

  const firstYearSubs = Number(get(req, "query.subs", 0));
  const totalYears = Number(get(req, "query.years", 0));
  const subsPerYear = Number(get(req, "query.subsPerYear", 0));

  const firstYearVideoCounts = Number(get(req, "query.videoCounts", 0));
  const videosPerYear = Number(get(req, "query.videosPerYear", 0));

  if (
    firstYearSubs === 0 ||
    totalYears === 0 ||
    subsPerYear === 0 ||
    firstYearVideoCounts === 0 ||
    videosPerYear === 0
  ) {
    return res.status(200).json({ status: "failed"}); 
  }
  const formula = await getMLRFormula();
  const views = Array(totalYears).fill(0).map((_, i) => {
    const year = i + 1;
    return Math.floor(
      MVLR.predict(
        formula,
        [year * subsPerYear + firstYearSubs, year * videosPerYear + firstYearVideoCounts],
      )[0]);
  });
  return res.status(200).json({ status: "success", views});
};
