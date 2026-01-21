import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  productStock: Number,
  shopImage: { type: String },
  createdBy: mongoose.Schema.Types.ObjectId,
})

export function getProductModel(connection) {
  return connection.models.Product || connection.model("Product", ProductSchema)
}