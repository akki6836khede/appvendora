"use server"

import { connectToOrderDB } from "@/lib/orderdb"
import { getOrderModel } from "@/models/orders"

import { connectToDeliveryDB } from "@/lib/deliverydb"
import { getDeliveryModel } from "@/models/delivery"

export async function settleCOD(email) {
    const orderConn = await connectToOrderDB()
    const Order = getOrderModel(orderConn)

    const deliveryConn = await connectToDeliveryDB()
    const Delivery = getDeliveryModel(deliveryConn)

    const deliveryAgent = await Delivery.findOne({ email }).lean()
    if (!deliveryAgent) {
        return { success: false, message: "Delivery agent not found" }
    }

    await Order.updateMany(
        {
            deliveryAgent: deliveryAgent._id,
            deliveredAt: { $ne: null },
            taken: true,
            payment: false,
            delivered: true
        },
        {
            $set: { payment: true }
        }
    )

    return { success: true }
}
