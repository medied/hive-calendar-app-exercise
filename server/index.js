import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import connectMongo from './mongo-connector';
import routes from './routes.js';

import { PORT } from './config';

const start = async () => {
  const mongo = await connectMongo();
  const app = express();
  // Logging
  app.use(logger('dev'));
  // Serve static files
  app.use(express.static(path.join(__dirname, '../public')));
  // Parse body params and attach them to req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Attach mongo instance on reqs
  app.use((req, res, next) => {
    req.mongo = mongo;
    next();
  });
  // Load all routes on /api path
  app.use('/api', routes);
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

start();
