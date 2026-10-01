import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnectedToMongo = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.log('[Database] No MONGO_URI specified in environment. Using embedded persistent JSON storage.');
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnectedToMongo = true;
    console.log('[Database] Successfully connected to MongoDB at:', uri);
    return true;
  } catch (err) {
    console.warn('[Database] Could not connect to MongoDB:', err.message);
    console.log('[Database] Gracefully falling back to local persistent storage. All data will be saved to disk.');
    isConnectedToMongo = false;
    return false;
  }
}

export function isMongoActive() {
  return isConnectedToMongo && mongoose.connection.readyState === 1;
}
