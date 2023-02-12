import _ from "lodash";
// @ts-ignore
import { euclidean } from "ml-distance-euclidean";
import { DatasetColumn, IDatasetDictionary, normalize, TDataset } from "./dataset";

export class KNNSimilarYoutubeChannels {
  dataset: Array<TDataset> = [];
  dictionary: IDatasetDictionary = {};

  constructor(dataset: Array<TDataset>) {
    this.dataset = normalize(dataset);
    this.start();  
  }

  start() {
    this.dataset
    .forEach(row => {
      this.dictionary[row[DatasetColumn.ID]] = {
        id: row[DatasetColumn.ID],
        name: row[DatasetColumn.NAME],
        similarChannels: [],
      };
      this.dataset
      .forEach(compareRow => {
        if (row[DatasetColumn.ID] !== compareRow[DatasetColumn.ID]) {
          const isSameCategory = compareRow[DatasetColumn.CATEGORY] === row[DatasetColumn.CATEGORY] ? 1 : 0;
          const similarityScore = euclidean(
            [row[DatasetColumn.SUBS], row[DatasetColumn.VIEWS], 1],
            [compareRow[DatasetColumn.SUBS], compareRow[DatasetColumn.VIEWS], isSameCategory],
          );
          this.dictionary[row[DatasetColumn.ID]].similarChannels.push({
            id: compareRow[DatasetColumn.ID],
            similarityScore,
          });
        }
      })
      this.dictionary[row[DatasetColumn.ID]]
      .similarChannels.sort(
        (a, b) => a.similarityScore-b.similarityScore
      );
    });
  }

  distance() {

  }
}