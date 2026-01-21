import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    createdBy: mongoose.Schema.Types.ObjectId,
    shopkeeperId: mongoose.Schema.Types.ObjectId,
    taken: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Boolean,
        default: false
    },
    deliveryAgent: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: null
    }
})

export function getOrderModel(connection) {
    return connection.models.Order || connection.model("Order", OrderSchema)
}