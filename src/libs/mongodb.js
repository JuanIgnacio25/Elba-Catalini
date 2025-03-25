"use server"

import mongoose  from "mongoose";

let connection = null;

export const connectDB = async () => {
  if (connection) return connection;
  try {
    connection = await mongoose.connect(process.env.MONGO_ATLAS_URL);
    
    return connection;
  } catch (err) {
    throw err;
  }
};
