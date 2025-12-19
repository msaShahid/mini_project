import dotenv from "dotenv";
import app from "./app.js";
import { logger } from "./utils/logger.js";
import connectDB from "./config/db.js";
import { connectRedis, disconnectRedis } from "./cache/index.js";
import { initKafka, shutdownKafka } from "./kafka/index.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

let isShuttingDown = false;

async function bootstrap() {
  try {
    logger.info("Starting server...");

    await connectDB();
    // await connectRedis();
    // await initKafka();

    const server = app.listen(PORT, () => {
      logger.info(`API running on port ${PORT}`);
    });

    const shutdown = async (signal: string) => {
      if (isShuttingDown) return;
      isShuttingDown = true;

      logger.warn(`Shutting down (${signal})`);

      // server.close(async () => {
      //   logger.info("HTTP server closed");

      //   try {
      //     await shutdownKafka();
      //     await disconnectRedis();
      //   } catch (err) {
      //     logger.error("Shutdown error:", err);
      //   } finally {
      //     process.exit(0);
      //   }
      // });

      setTimeout(() => {
        logger.error("Force shutdown after timeout");
        process.exit(1);
      }, 10_000).unref();
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (err) {
    logger.error("Startup failed:", err);
    process.exit(1);
  }
}

bootstrap();
