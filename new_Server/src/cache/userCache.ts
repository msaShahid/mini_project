import { IUser } from "../models/user.model.js";
import { getUserDetailsKey, getUserListKey } from "./keys.js";
import { setJson, getJson, deleteKey } from "./query.js";
import { cacheConfig } from "../config/redis.js";

const TTL = cacheConfig.contentCacheTTL;

type Cached<T> = {
  data: T;
  cachedAt: string;
};

export async function saveUserList(users: IUser[]) {
  return setJson<Cached<IUser[]>>(
    getUserListKey(),
    { data: users, cachedAt: new Date().toISOString() },
    TTL
  );
}

export async function getUserList() {
  return getJson<Cached<IUser[]>>(getUserListKey());
}

export async function saveUserDetails(userId: string, user: IUser) {
  return setJson<Cached<IUser>>(
    getUserDetailsKey(userId),
    { data: user, cachedAt: new Date().toISOString() },
    TTL
  );
}

export async function getUserDetails(userId: string) {
  return getJson<Cached<IUser>>(getUserDetailsKey(userId));
}

export async function invalidateUser(userId?: string) {
  if (userId) {
    await deleteKey(getUserDetailsKey(userId));
  }
  await deleteKey(getUserListKey());
}

export default {
  saveUserList,
  getUserList,
  saveUserDetails,
  getUserDetails,
  invalidateUser,
};