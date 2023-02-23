import { SLR } from "../helpers/simple-linear-regression";
import { TDataset } from "../helpers/dataset";

describe("Testing Simple Linear Regression training model", () => {
  it("Calculate a slope", () => {
    const data = [
      [0,"0", 1, 2, 3, "Music", 2015],
      [1,"1", 4, 8, 20, "Music", 2017],
    ] as Array<TDataset>;
    const slr = new SLR(data);
    expect(slr.regression.slope).toBe(2);
  })

  it("Predict value (y)", () => {
    const data = [
      [0,"0", 1, 2, 3, "Music", 2015],
      [1,"1", 4, 8, 20, "Music", 2017],
    ] as Array<TDataset>;
    const slr = new SLR(data);
    expect(slr.regression.predict(4)).toBe(8);
  })
})