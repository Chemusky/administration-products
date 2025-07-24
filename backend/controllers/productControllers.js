import mongoose from "mongoose";
import productModel from "../models/productModel.js"; /* Importante que tenga la extensión del archivo al final */

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      status: "All products were found!!",
      data: products,
      error: null,
    });
  } catch (error) {
    console.log("Error in fetching products: ", error.message);
    res.status(500).json({
      status: "Failed to get all products",
      data: null,
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("ID product: ", productId);
    const product = await productModel.findById(productId);
    res.status(200).json({
      status: "Product found by suceeded!!",
      data: product,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed to find the selected product",
      data: null,
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  const newProduct = new productModel({
    name,
    price,
    image,
  });

  try {
    await newProduct.save();
    res.status(201).json({
      status: "Succeeded creation",
      message: "Product create successfully.",
      data: newProduct,
      error: null,
    });
  } catch (error) {
    console.log("Error creating products: ", error.messsage);
    res.status(500).json({
      status: "Failed to get all products",
      data: null,
      error: error.message,
    });
  }
};

// update se corresponde con put en thunderclient, etc
// Actualiza todos los campos del producto
export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    const updateProduct = await productModel.findByIdAndUpdate(
      productId,
      product,
      { new: true }
    );
    res.status(200).json({
      status: "Succeded Update!!",
      success: true,
      message: "Product updated successfully",
      data: updateProduct,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed to update the product!",
      success: false,
      data: null,
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  // 1. Manejo de ID inválido: Corregir typos en 'success' y 'message'
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      // Cambiado a 400 Bad Request para ID inválido
      success: false, // Corregido 'sucess' a 'success'
      message: "Invalid Product ID", // Corregido 'messsage' a 'message'
    });
  }

  try {
    const product = await productModel.findByIdAndDelete(productId); // Puedes eliminar y obtener el producto eliminado en un solo paso

    if (!product) {
      // Si el producto no fue encontrado (findByIdAndDelete devuelve null si no existe)
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // 2. Manejo de Éxito: Enviar 'success: true' y 'message'
    res.status(200).json({
      // Cambiado .send a .json para coherencia
      success: true, // ¡Alineado con lo que espera el frontend!
      message: `The product ${product.name} was deleted successfully.`, // ¡Alineado con lo que espera el frontend!
    });
  } catch (error) {
    // 3. Manejo de Errores: Enviar 'success: false' y corregir typo en 'message'
    console.error("Error deleting product:", error); // Para ver el error completo en tu terminal del backend
    res.status(500).json({
      success: false, // ¡Alineado con lo que espera el frontend!
      message: `Failed to delete the product!: ${error.message},`, // Corregido 'messsage' a 'message' y añadido detalle del error
      // data: null, // 'data' no es necesario si el frontend no lo espera para errores
    });
  }
};
