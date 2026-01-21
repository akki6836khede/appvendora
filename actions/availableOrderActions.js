"use server"

import { connectToOrderDB } from "@/lib/orderdb"
import { getOrderModel } from "@/models/orders"

import { revalidatePath } from "next/cache"

import { connectToDeliveryDB } from "@/lib/deliverydb"
import { getDeliveryModel } from "@/models/delivery"

export async function orderFunctionality(funct, id, d_email) {
    const orderConn = await connectToOrderDB()
    const Order = getOrderModel(orderConn)

    const deliveryConn = await connectToDeliveryDB()
    const Delivery = getDeliveryModel(deliveryConn)

    const d = await Order.findById(id).lean()

    if (funct === "go_to_assigned") {
        const delivery_boy_id = await Delivery.findOne({ email: d_email }).lean()
        await Order.findOneAndUpdate(
            { _id: id },
            { taken: true, deliveryAgent: delivery_boy_id },
            { new: true }
        )
    }

    if (funct === "go_to_not_assigned") {
        await Order.findOneAndUpdate(
            { _id: id },
            { taken: false, deliveryAgent: null },
            { new: true }
        )
    }

    if (funct === "go_to_delivered" && d.taken === true) {
        await Order.findOneAndUpdate(
            { _id: id },
            { delivered: true, deliveredAt: Date.now() },
            { new: true }
        )
    }

    revalidatePath("/delivery")

    return { success: true }
}