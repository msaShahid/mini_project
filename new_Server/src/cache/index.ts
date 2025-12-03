import client from './client.js';

export async function connectRedis() {
  if (!client.isOpen) {
    try {
      await client.connect();
      console.log('Redis client connected');
    } catch (err) {
      console.error('Redis connection failed:', err);
      setTimeout(connectRedis, 5000); 
    }
  }
}

export default client;
