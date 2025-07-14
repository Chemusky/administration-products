// const express = require("express"); Esta sintaxis es más tradicional
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js"; /* se importa la función exportada y abajo se utiliza */
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDb(); /* se establece dentro de esta función */
  console.log(`Server running at http://localhost:${PORT}`);
});
