import { MongoClient } from 'mongodb';
import { MONGO_URL, DB_NAME } from './config';

export default async function() {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DB_NAME);

  const collections = {
    Events: db.collection('events'),
  };

  return collections;
}
