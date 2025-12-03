import { IUser } from "../models/user.model.js";
import { getUserDetailsKey, getUserListKey } from "./keys.js";
import { setJson, getJson } from "./query.js";
import client from "./index.js";
import { caching } from "../config.js";

const TTL_MS = Number(caching.contentCacheDuration);

// Save all users
async function saveUserList(users: IUser[]) {
  const key = getUserListKey();
  const expiry = new Date(Date.now() + TTL_MS);

  return setJson(key, { 
    data: users, 
    cachedAt: new Date().toISOString() 
  }, expiry);
}

// Get all users
async function getUserList() {
  const key = getUserListKey();
  return getJson<{ data: IUser[], cachedAt: string }>(key);
}

// Save single user details
async function saveUserDetails(userId: string, data: IUser) {
  const key = getUserDetailsKey(userId);
  const expiry = new Date(Date.now() + TTL_MS);

  return setJson(key, {
    data,
    cachedAt: new Date().toISOString()
  }, expiry);
}

// Get single user details
async function getUserDetails(userId: string) {
  const key = getUserDetailsKey(userId);
  return getJson<{ data: IUser, cachedAt: string }>(key);
}

// Invalidate cache
async function invalidateUser(userId?: string) {
  if (userId) {
    await client.del(getUserDetailsKey(userId)); 
  }

  await client.del(getUserListKey()); 
}

export default {
  saveUserList,
  getUserList,
  saveUserDetails,
  getUserDetails,
  invalidateUser
};
