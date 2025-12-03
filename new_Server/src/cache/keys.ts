export const RedisPrefixes = {
  USER: "user",
  LIST: "list",
  DETAILS: "details",
} as const;

export type RedisPrefixKey = keyof typeof RedisPrefixes;

export function buildKey(
  prefix: RedisPrefixKey,
  subPrefix: RedisPrefixKey,
  id: string
) {
  return `${RedisPrefixes[prefix]}:${RedisPrefixes[subPrefix]}:${id}`;
}

export function getUserDetailsKey(userId: string) {
  return buildKey("USER", "DETAILS", userId);
}

export function getUserListKey() {
  return buildKey("USER", "LIST", "ALL");
}
