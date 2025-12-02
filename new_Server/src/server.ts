import cluster from 'cluster';
import os from 'os';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import { logger } from './utils/logger.js';

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  logger.info(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker on exit
  cluster.on('exit', (worker, code, signal) => {
    logger.warn(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

  // shutdown master
  process.on('SIGTERM', () => {
    logger.info('Master shutting down gracefully');
    for (const id in cluster.workers) {
      cluster.workers[id]?.kill('SIGTERM');
    }
    process.exit(0);
  });

} else {
  // Worker process: connect to DB and start server

  if (process.env.MODE !== "test") {
    mongoose.connect(process.env.MONGO_URL as string)
      .then(() => {
        app.listen(PORT, () => {
          logger.info(`Worker ${process.pid} started on port ${PORT}`);
        });
      })
      .catch((err) => {
        logger.error('MongoDB connection error:', err);
        process.exit(1);
      });
  }

  // shutdown worker
  process.on('SIGTERM', () => {
    logger.info(`Worker ${process.pid} shutting down gracefully`);
    process.exit(0);
  });
}
