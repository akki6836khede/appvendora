"use server"

import { connectToOrderDB } from "@/lib/orderdb"
import { getOrderModel } from "@/models/orders"

import { connectToDeliveryDB } from "@/lib/deliverydb"
import { getDeliveryModel } from "@/models/delivery"

export async function getAmount(email) {
    const orderConn = await connectToOrderDB()
    const Order = getOrderModel(orderConn)

    const deliveryConn = await connectToDeliveryDB()
    const Delivery = getDeliveryModel(deliveryConn)

    const d = await Delivery.findOne({ email: email }).lean()
    const d_id = d?._id

    const arr = await Order.find({
        deliveryAgent: d_id,
        deliveredAt: { $ne: null },
        taken: true,
        payment: false,
        delivered: true
    }).lean();

    const totalAmount = arr.reduce((sum, arr_n) => {
        return sum + arr_n.productPrice;
    }, 0);

    return { total: totalAmount }
}