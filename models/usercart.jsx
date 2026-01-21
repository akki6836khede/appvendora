import mongoose from "mongoose"

const CartSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  shopImage: { type: String },
  createdBy: mongoose.Schema.Types.ObjectId,
  shopkeeperId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId
})

export function getCartModel(connection) {
  return connection.models.Cart || connection.model("Cart", CartSchema)
}