import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');

dotenv.config({ silent: true, path: envPath });

// Add more config exports here as needed.
export const { MONGO_URL, PORT, DB_NAME } = process.env;

const defaults = {
  MONGO_URL: 'mongodb://mongo.hive.com:3001',
  PORT: 9009,
  DB_NAME: 'yourdb',
};

Object.keys(defaults).forEach(key => {
  if (!process.env[key] || process.env[key] === defaults[key]) {
    console.warn(
      `Please enter a custom ${key} in your .env file on the root directory`
    );
  }
});
