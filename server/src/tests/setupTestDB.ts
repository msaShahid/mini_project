import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'test'}` });

export const connectTestDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('❌ MONGO_URI not set in .env.test');
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB test database');
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export const closeTestDB = async () => {
  await mongoose.connection.dropDatabase(); // optional
  await mongoose.connection.close();
  console.log('🧹 Closed MongoDB test database');
};
