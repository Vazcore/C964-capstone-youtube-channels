// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { readCSVDataset } from "@/helpers/server-utils";
import { IDataSetChannel } from "@/helpers/dataset";
import { KNNSimilarYoutubeChannels } from "@/helpers/knn";
import { connect, DBConfig } from "@/db/connect";
import { DB_COLLECTION } from "@/db/collections";
import { fromDatasetToModels, insertAllChannels } from "@/db/services/channels";
import { insertBulkSimilarChannels, ISimilarChannel } from "@/db/services/similar-channels";
//import KNN from "ml-knn";

type Data = {
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  const dataset = await readCSVDataset("topSubscribed.csv");

  /**
   * Run K-Nearest-Neighbor algorithm to create
   * a dictionary for all channels and rate based on
   * a similarity score (euclidean distance)
   */
  const knn = new KNNSimilarYoutubeChannels(dataset);
  
  /**
   * Clear database collections
   */
  await DBConfig.db.dropCollection(DB_COLLECTION.CHANNELS);
  await DBConfig.db.dropCollection(DB_COLLECTION.SIMILAR_CHANNELS);
  
  // Insert channels data
  await insertAllChannels(fromDatasetToModels(knn.dataset));
  
  // Write similar channels into Database
  const similarChannels: Array<ISimilarChannel> = Object.values(knn.dictionary)
  .flatMap((row: IDataSetChannel) => {
    return row.similarChannels.map(ch => ({
        id: ch.id,
        similarToChannelId: row.id,
        similarityScore: ch.similarityScore,
      } as ISimilarChannel
    )).slice(0, 10);
  });
  await insertBulkSimilarChannels(similarChannels);
  res.status(200).json({ status: "Ok"});
}