import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  {
    timestamps: true /* Si timestamps es true añade createdAt y updatedAt */,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
); /* Se pone en singular "Product" porque luego en Mongo Atlas lo crea en plural */

export default Product;
