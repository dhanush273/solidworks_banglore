import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

let isConnectedToMongo = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.log('[Database] No MongoDB URI configured. Using local JSON storage.');
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isConnectedToMongo = true;
    console.log('[Database] Connected to MongoDB database:', mongoose.connection.name);
    return true;
  } catch (error) {
    isConnectedToMongo = false;
    console.warn('[Database] MongoDB connection failed:', error.message);
    console.log('[Database] Continuing with local JSON storage.');
    return false;
  }
}

export function isMongoActive() {
  return isConnectedToMongo && mongoose.connection.readyState === 1;
}