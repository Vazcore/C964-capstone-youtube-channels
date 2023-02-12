import { DatasetColumn, TDataset } from "@/helpers/dataset";
import { strToNum } from "@/helpers/utils";
import { DB_COLLECTION, getCollection } from "../collections";

export interface IChannel {
  id: number;
  name: string;
  subs: number;
  views: number;
  videoCounts: number;
  category: string;
  startedYear: number;
  thumbnail?: string;
}

export const fromDatasetToModels = (dataset: Array<TDataset>): Array<IChannel> => {
  const channels: Array<IChannel> = [];
  dataset.forEach(row => {
    channels.push({
      id: strToNum(row[DatasetColumn.ID]),
      name: row[DatasetColumn.NAME],
      subs: strToNum(row[DatasetColumn.SUBS]),
      views: strToNum(row[DatasetColumn.VIEWS]),
      videoCounts: strToNum(row[DatasetColumn.VIDEO_COUNT]),
      category: row[DatasetColumn.CATEGORY],
      startedYear: strToNum(row[DatasetColumn.STARTED_YEAR]),
    });
  });

  return channels;
};

export const getAllChannels = async (offset = 0, limit = 8) => {
  const chanellCollection = getCollection(DB_COLLECTION.CHANNELS);
  const channels = await chanellCollection?.find({}).sort({ id: -1 }).skip(offset).limit(limit).toArray();
  return channels;
};

export const insertAllChannels = async (channels: Array<IChannel>) => {
  const chanellCollection = getCollection(DB_COLLECTION.CHANNELS);
  const bulk = chanellCollection?.initializeUnorderedBulkOp();
  if (bulk) {
    channels.forEach(channel => bulk.insert(channel));
    await bulk.execute();
  }
};