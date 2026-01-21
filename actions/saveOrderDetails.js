"use server"

import mongoose from "mongoose"

import { connectToOrderDB } from "@/lib/orderdb"
import { getOrderModel } from "@/models/orders"

import { connectToProductDB } from "@/lib/productdb"
import { getProductModel } from "@/models/product"

export async function saveOrder(cart, shopkeeperId, payment_status) {
    const orderConn = await connectToOrderDB()
    const Order = getOrderModel(orderConn)

    const productConn = await connectToProductDB()
    const Product = getProductModel(productConn)


    for (const item of cart) {
        await Order.create({
            productName: item.productName,
            productPrice: item.productPrice,
            createdBy: item.createdBy,
            shopkeeperId: item.shopkeeperId,
            taken: false,
            delivered: false,
            payment: payment_status,
            deliveryAgent: null,
            deliveredAt: null,
            createdAt: Date.now()
        })
        const st = await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { productStock: -1 } },
            { new: true }
        )

    }

    return { success: true }
}