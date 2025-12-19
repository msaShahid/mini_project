export const RedisPrefixes = {
  USER: "user",
  LIST: "list",
  DETAILS: "details",
} as const;

type Prefix = typeof RedisPrefixes[keyof typeof RedisPrefixes];
type KeyPart = Prefix | string;

function buildKey(...parts: KeyPart[]) {
  return parts.join(":");
}

export function getUserDetailsKey(userId: string) {
  return buildKey(RedisPrefixes.USER, RedisPrefixes.DETAILS, userId);
}

export function getUserListKey() {
  return buildKey(RedisPrefixes.USER, RedisPrefixes.LIST, "ALL");
}
