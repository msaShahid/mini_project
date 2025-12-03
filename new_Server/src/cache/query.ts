import client from "./index.js";

function ensureConnected() {
  if (!client.isOpen) {
    throw new Error("Redis client is not connected");
  }
}

export async function setJson<T>(
  key: string,
  value: T,
  expireAt?: Date
) {
  ensureConnected()
  try {
    const json = JSON.stringify(value);

    if (expireAt) {
      const ttl = expireAt.getTime() - Date.now();
      if (ttl <= 0) return false;

      return await client.set(key, json, { PX: ttl });
    }

    return await client.set(key, json);
  } catch (err) {
    console.error("Redis setJson error:", err);
    return false;
  }
}

export async function getJson<T>(key: string): Promise<T | null> {
  ensureConnected()
  try {
    const type = await client.type(key);
    if (type !== "string") return null;

    const raw = await client.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (err) {
    console.error("Redis getJson error:", err);
    return null;
  }
}
