import { strToNum } from "./utils";

export enum DatasetColumn {
  ID = 0,
  NAME = 1,
  SUBS = 2,
  VIEWS = 3,
  VIDEO_COUNT = 4,
  CATEGORY = 5,
  STARTED_YEAR = 6,
}

export type TDataset = [number, string, number, number, number, string, number]; 

export const normalize = (dataSet: Array<TDataset>): Array<TDataset> => {
  return dataSet
    .map(row => ([
      strToNum(row[DatasetColumn.ID]),
      row[DatasetColumn.NAME],
      strToNum(row[DatasetColumn.SUBS]),
      strToNum(row[DatasetColumn.VIEWS]),
      strToNum(row[DatasetColumn.VIDEO_COUNT]),
      row[DatasetColumn.CATEGORY],
      strToNum(row[DatasetColumn.STARTED_YEAR]),
    ] as TDataset))
    .filter(
      row => row[DatasetColumn.SUBS] > 0 &&
      row[DatasetColumn.VIEWS] &&
      row[DatasetColumn.VIDEO_COUNT] &&
      !row[DatasetColumn.CATEGORY].includes("http"),
    );
};

export interface ISimilarChannel {
  id: number;
  similarityScore: number;
}

export interface IDataSetChannel {
  id: number;
  name: string;
  similarChannels: Array<ISimilarChannel>;
}

export interface IDatasetDictionary {
  [id: number]: IDataSetChannel;
}