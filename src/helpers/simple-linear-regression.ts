import { DatasetColumn, normalize, TDataset } from "./dataset";
import SimpleLinearRegression from "ml-regression-simple-linear";

export class SLR {
  dataset: Array<TDataset> = [];
  regression: SimpleLinearRegression;

  static predict(formulaStr: string, x: number): number {
    const regression = SimpleLinearRegression.load(JSON.parse(formulaStr));
    return regression.predict(x);
  }
  
  constructor(dataset: Array<TDataset>) {
    this.dataset = normalize(dataset);
    this.regression = this.start();
  }

  start(): SimpleLinearRegression {
    /**
     * Calculate a simple linear regression,
     * where x is a number of subscribers and y is a number of views
     * y is a dependent variable
     * x is an independent variable
     */
    const [x, y] = this.parseVariables();

    return new SimpleLinearRegression(x, y);
  }

  parseVariables() {
    const x: number[] = [];
    const y: number[] = [];
    this.dataset.forEach(row => {
      x.push(row[DatasetColumn.SUBS]);
      y.push(row[DatasetColumn.VIEWS]);
    });
    return [x, y];
  }
}