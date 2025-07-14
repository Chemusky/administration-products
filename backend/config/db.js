import mongoose from "mongoose";

// se realiza en este archivo la conexión a la base de datos
// esta función se exporta y se importa en el archivo app.js

export const connectDb = async () => {
  try {
    const url_mongo = process.env.MONGO_URI;
    const conn = await mongoose.connect(url_mongo);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process code 1 code means exit with failure, 0 means success
  }
};
