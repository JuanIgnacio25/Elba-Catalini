import mongoose  from "mongoose";

let connection = null;

export const connectDB = async () => {
  if (connection) return connection;
  try {
    connection = await mongoose.connect(process.env.MONGO_ATLAS_URL);
    
    console.log("Conexión a la base de datos establecida");
    
    return connection;
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    throw err;
  }
};

export default mongoose;