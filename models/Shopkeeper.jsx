import mongoose from "mongoose";

const ShopkeeperSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    shopCategory: { type: String, required: true },
    ownerContact: { type: String, required: true },
    shopAddress: { type: String, required: true },
    shopLatitude: { type: Number },
    shopLongitude: { type: Number },
    email: { type: String, required: true, unique: true },
    shopImage: { type: String },
    openingTime: { type: String, required: true }, 
    closingTime: { type: String, required: true },
  },
  { timestamps: true } 
);

export function getShopModel(connection) {
  return connection.models.Shop || connection.model("Shop", ShopkeeperSchema)
}