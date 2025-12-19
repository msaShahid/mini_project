import redis  from "./client.js";
import { logger } from "../utils/logger.js";

function ensureConnected() {
  if (!redis.isOpen) {
    throw new Error("Redis client is not connected");
  }
}

export async function setJson<T>(
  key: string,
  value: T,
  ttlMs?: number
): Promise<boolean> {
  ensureConnected();

  try {
    const payload = JSON.stringify(value);

    if (ttlMs && ttlMs > 0) {
      await redis.set(key, payload, { PX: ttlMs });
    } else {
      await redis.set(key, payload);
    }

    return true;
  } catch (err) {
    logger.error("Redis setJson error:", err);
    return false;
  }
}

export async function getJson<T>(key: string): Promise<T | null> {
  ensureConnected();

  try {
    const raw = await redis.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (err) {
    logger.error("Redis getJson error:", err);
    return null;
  }
}

export async function deleteKey(key: string) {
  ensureConnected();
  await redis.del(key);
}
