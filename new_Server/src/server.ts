import cluster from 'cluster';
import os from 'os';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import { logger } from './utils/logger.js';
import { connectRedis } from './cache/index.js';

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 5000;
const numCPUs = Math.max(os.cpus().length - 1, 1);

if (cluster.isPrimary) {
  logger.info(`Master ${process.pid} is running`);

  try {
    await connectRedis();
    logger.info("Redis connected (master)");
  } catch (err) {
    logger.error("Redis connection failed:", err);
    process.exit(1);
  }

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

  try {
    await connectRedis();
    logger.info(`Redis connected (worker ${process.pid})`);
  } catch (err) {
    logger.error(`Redis connection failed (worker ${process.pid}):`, err);
    process.exit(1);
  }

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
