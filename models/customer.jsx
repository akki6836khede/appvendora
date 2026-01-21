import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerContact: { type: String, required: true },
    customerAddress: { type: String, required: true },
    customerLatitude: { type: Number },
    customerLongitude: { type: Number },
    landmark: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true } 
);

export function getCustomerModel(connection) {
  return connection.models.Customer || connection.model("Customer", CustomerSchema)
}