import { createClient } from "redis";
import { redisConfig } from "../config/redis.js";
import { logger } from "../utils/logger.js";

const redis = createClient({
  socket: {
    host: redisConfig.host|| "redis-stack",
    port: Number(redisConfig.port) || 6379,
  },
  ...(redisConfig.password
    ? { password: redisConfig.password }
    : {}),
});

redis.on("connect", () => logger.info("Redis connecting..."));
redis.on("ready", () => logger.info("Redis ready"));
redis.on("reconnecting", () => logger.warn("Redis reconnecting..."));
redis.on("end", () => logger.warn("Redis connection closed"));
redis.on("error", (err) => logger.error("Redis error:", err));

export default redis;
