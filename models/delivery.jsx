import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema(
  {
    partnerName: { type: String, required: true },
    vehicleCategory: { type: String, required: true },
    deliveryContact: { type: String, required: true },
    baseAddress: { type: String, required: true },
    deliveryLatitude: { type: Number },
    deliveryLongitude: { type: Number },
    deliveryBoyID: { type: String, required: true },
    avaibilityCheck: { type: Boolean, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true } 
);

export function getDeliveryModel(connection) {
  return connection.models.Delivery || connection.model("Delivery", DeliverySchema)
}