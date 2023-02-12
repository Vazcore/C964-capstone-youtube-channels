import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";
import get from "lodash/get";
import { DB_COLLECTION, setCollection } from "./collections";

interface IDBConfig {
  client: mongoDB.MongoClient;
  db: mongoDB.Db;
}
export const DBConfig = {} as IDBConfig;

export const connect = async () => {
  if (DBConfig.db) {
    return;
  }
  dotenv.config();
  DBConfig.client = new mongoDB.MongoClient(get(process, "env.DB_CONN_STRING", ""));
  await DBConfig.client.connect();
  DBConfig.db = DBConfig.client.db(process.env.DB_NAME);
  const channelsCollection: mongoDB.Collection = DBConfig.db.collection(get(process, "env.CHANNELS_COLLECTION_NAME", ""));
  const similarChannelsCollection: mongoDB.Collection = DBConfig.db.collection(get(process, "env.SIMILAR_CHANNELS_COLLECTION_NAME", ""));
  const regressionsCollection: mongoDB.Collection = DBConfig.db.collection(get(process, "env.REGRESSIONS", ""));
  const channelsSLRCollection: mongoDB.Collection = DBConfig.db.collection(get(process, "env.CHANELLS_SLR", ""));
  setCollection(DB_COLLECTION.CHANNELS, channelsCollection);
  setCollection(DB_COLLECTION.SIMILAR_CHANNELS, similarChannelsCollection);
  setCollection(DB_COLLECTION.REGRESSIONS, regressionsCollection);
  setCollection(DB_COLLECTION.CHANELLS_SLR, channelsSLRCollection);
};

// export const closeConnection = async () => {
//   try {
//     await DBConfig.client.close();
//     console.log("Closed!");
//   } catch (error) {
//     console.log("Not closed!");
//   }
// };
