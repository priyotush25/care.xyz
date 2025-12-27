// MongoDB connection singleton
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Connection check moved inside function to prevent build/runtime crashes on module load

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  console.log("connectDB called");
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    if (!MONGODB_URI) {
      const error = new Error(
        "Please define the MONGODB_URI environment variable"
      );
      console.error(error.message);
      throw error;
    }
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("MongoDB connection error:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
