import { DatasetColumn, normalize, TDataset } from "./dataset";
import MLR from "ml-regression-multivariate-linear";

export class MVLR {
  dataset: Array<TDataset> = [];
  regression: MLR;

  static predict(formula: string, x: number[]) {
    const mlr = MLR.load(JSON.parse(formula));
    return mlr.predict(x);
  }

  constructor(dataset: Array<TDataset>) {
    this.dataset = normalize(dataset);
    this.regression = this.start();
  }

  start() {
    const x: Array<number[]> = [];
    const y: Array<number[]> = [];

    this.dataset.forEach(row => {
      x.push([row[DatasetColumn.SUBS], row[DatasetColumn.VIDEO_COUNT]]);
      y.push([row[DatasetColumn.VIEWS]]);
    });

    return new MLR(x, y);
  }
}
