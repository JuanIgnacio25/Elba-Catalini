"use server"
import mongoose from "mongoose";

// Usamos el objeto global para que la conexión persista entre recargas del servidor
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGO_ATLAS_URL, opts).then((mongoose) => {
      console.log("✅ Nueva conexión a MongoDB establecida");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};