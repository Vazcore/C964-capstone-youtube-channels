import * as mongoDB from "mongodb";

export enum DB_COLLECTION {
  CHANNELS = "channels",
  SIMILAR_CHANNELS = "similarChannels",
}

export interface IDBCollections {
  channels?: mongoDB.Collection;
  similarChannels?: mongoDB.Collection;
}

const collections: IDBCollections = {};

export const getCollection = (collectionName: DB_COLLECTION) => {
  return collections[collectionName];
};

export const setCollection = (collectionName: DB_COLLECTION, collection: mongoDB.Collection) => {
  return collections[collectionName] = collection;
};
