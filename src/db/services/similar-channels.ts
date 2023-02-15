import { DB_COLLECTION, getCollection } from "../collections";

export interface ISimilarChannel {
  id: number;
  similarToChannelId: number;
  similarityScore: number;
}

export const insertBulkSimilarChannels = async (data: Array<ISimilarChannel>) => {
  const similarChannelsCollection = getCollection(DB_COLLECTION.SIMILAR_CHANNELS);
  const bulk = similarChannelsCollection?.initializeUnorderedBulkOp();
  if (bulk) {
    data.forEach(channel => bulk.insert(channel));
    await bulk.execute();
  }
};

export const getRecommendedVideos = async (similarToChannelId: number) => {
  const LIMIT = 3;
  const similarChannelsCollection = getCollection(DB_COLLECTION.SIMILAR_CHANNELS);
  //const channels = await similarChannelsCollection?.find({ similarToChannelId }).limit(LIMIT).toArray();
  const channels = await similarChannelsCollection?.aggregate([
    {
      $match: {
        similarToChannelId,
      },
    },
    {
      $lookup: {
        from: DB_COLLECTION.CHANNELS,
        localField: "id",
        foreignField: "id",
        as: "details",
      },
    },
  ]).limit(LIMIT).toArray();
  return channels;
};
