const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nxtlang';

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Cache connection across HMR/serverless invocations
if (!global._mongoose) {
  global._mongoose = { conn: null, promise: null, handlersAttached: false };
}
const cached = global._mongoose;

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((m) => {
        if (!cached.handlersAttached) {
          m.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
          });

          m.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
          });

          m.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
          });

          cached.handlersAttached = true;
        }

        console.log('✅ MongoDB connected successfully');
        return m;
      })
      .catch((error) => {
        cached.promise = null;
        console.error('❌ MongoDB connection failed:', error?.message || error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

async function disconnectDB() {
  try {
    await mongoose.connection.close();
    cached.conn = null;
    cached.promise = null;
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

function getConnectionStatus() {
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  return states[mongoose.connection.readyState];
}

function isConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = { connectDB, disconnectDB, getConnectionStatus, isConnected };