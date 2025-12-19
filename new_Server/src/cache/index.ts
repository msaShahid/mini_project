import  redis from "./client.js";
import { logger } from "../utils/logger.js";

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
    logger.info("Redis connected");
  }
}

export async function disconnectRedis() {
  if (redis.isOpen) {
    await redis.quit();
    logger.info("Redis disconnected");
  }
}
