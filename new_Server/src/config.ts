
export const redis = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || "",
};

export const caching = {
  contentCacheDuration: process.env.CONTENT_CACHE_DURATION_MILLISECONDS
}