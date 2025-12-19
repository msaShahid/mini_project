import cluster from "cluster";
import os from "os";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import { logger } from "./utils/logger.js";
import client from "./cache/client.js";
import { initKafka } from "./kafka/index.js";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5000;
const numCPUs = Math.max(os.cpus().length - 1, 1);

if (cluster.isPrimary) {
  logger.info(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker) => {
    logger.warn(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

  process.on("SIGTERM", () => {
    for (const id in cluster.workers) cluster.workers[id]?.kill("SIGTERM");
    process.exit(0);
  });
} else {
  // Worker: connect Redis
  client.connect().then(() => logger.info(`Redis connected (worker ${process.pid})`))
              .catch((err) => { logger.error(err); process.exit(1); });

  // Kafka
  initKafka().then(() => logger.info(`Kafka initialized (worker ${process.pid})`))
             .catch((err) => { logger.error(err); process.exit(1); });

  // MongoDB + Express
  mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
      app.listen(PORT, () => logger.info(`Worker ${process.pid} listening on port ${PORT}`));
    })
    .catch((err) => { logger.error(err); process.exit(1); });

  process.on("SIGTERM", () => {
    logger.info(`Worker ${process.pid} shutting down`);
    process.exit(0);
  });
}
