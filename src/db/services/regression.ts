import { get } from "lodash";
import { DB_COLLECTION, getCollection } from "../collections";

export enum REGRESSION_TYPES {
  SIMPLE_LINEAR = "simple-linear-regression",
  MLR = "multivariant-linear-regression",
}

export const saveSimpleLinearRegressionFormula = async (data: string) => {
  const regressionsCollection = getCollection(DB_COLLECTION.REGRESSIONS);
  await regressionsCollection?.insertOne({type: REGRESSION_TYPES.SIMPLE_LINEAR, formula: data});
};

export const getSimpleLinearRegressionFormula = async () => {
  const regressionsCollection = getCollection(DB_COLLECTION.REGRESSIONS);
  const result = await regressionsCollection?.find({type: REGRESSION_TYPES.SIMPLE_LINEAR}).toArray();
  return get(result, "[0].formula", "");
};

export const saveMLRFormula = async (data: string) => {
  const regressionsCollection = getCollection(DB_COLLECTION.REGRESSIONS);
  await regressionsCollection?.insertOne({type: REGRESSION_TYPES.MLR, formula: data});
};

export const getMLRFormula = async () => {
  const regressionsCollection = getCollection(DB_COLLECTION.REGRESSIONS);
  const result = await regressionsCollection?.find({type: REGRESSION_TYPES.MLR}).toArray();
  return get(result, "[0].formula", "");
};
