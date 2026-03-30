import mongoose from 'mongoose';

/**
 * connectDB — establishes MongoDB connection.
 * Uses the MONGODB_URI from environment variables.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devprose';

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    throw err;
  }
}
