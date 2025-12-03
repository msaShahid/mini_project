import { createClient } from "redis";
import { redis } from "../config.js";

const redisURL = `redis://:${redis.password}@${redis.host}:${redis.port}`;

const client = createClient({url: redisURL});

// Events
client.on("connect", () => console.log("Redis: Connecting..."));
client.on("ready", () => console.log("Redis: Ready"));
client.on("end", () => console.log("Redis: Connection closed"));
client.on("reconnecting", () => console.log("Redis: Reconnecting..."));
client.on("error", (err) => console.error("Redis Error:", err));

export default client;
