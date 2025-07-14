import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

// http://localhost:5000/api/products
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/add-product", createProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
