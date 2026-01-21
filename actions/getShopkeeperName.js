"use server"

import { connectToShopkeeperDB } from "@/lib/shopkeeperdb"
import { getShopModel } from "@/models/Shopkeeper"

import { connectToOrderDB } from "@/lib/orderdb"
import { getOrderModel } from "@/models/orders"

import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"

import { connectToCustomerDB } from "@/lib/customerdb"
import { getCustomerModel } from "@/models/customer"

export default async function getShopName() {
    const shopConn = await connectToShopkeeperDB()
    const Shop = getShopModel(shopConn)

    const orderConn = await connectToOrderDB()
    const Order = getOrderModel(orderConn)

    const customerConn = await connectToCustomerDB()
    const Cust = getCustomerModel(customerConn)

    await connectToDB()

    const orders = await Order.find().lean()

    const shopIds = [...new Set(
        orders.map(o => o.shopkeeperId?.toString())
    )]

    const userIds = [...new Set(
        orders.map(o => o.createdBy?.toString())
    )]

    const [shops, users] = await Promise.all([
        Shop.find({ _id: { $in: shopIds } }).lean(),
        User.find({ _id: { $in: userIds } }).lean()
    ])

    const emails = users.map(u => u.email)

    const customers = await Cust.find({ email: { $in: emails } }).lean()

    const shopMap = new Map(
        shops.map(s => [s._id.toString(), s])
    )

    const userMap = new Map(
        users.map(u => [u._id.toString(), u])
    )

    const customerMap = new Map(
        customers.map(c => [c.email, c])
    )

    // Yahan tak sab same rakha
    const mappedOrders = orders.map(order => {
        const shop = shopMap.get(order.shopkeeperId?.toString())
        const user = userMap.get(order.createdBy?.toString())
        const customer = user ? customerMap.get(user.email) : null

        return {
            _id: order._id?.toString() ?? null,

            productName: order.productName,
            productPrice: order.productPrice,

            taken: order.taken,
            delivered: order.delivered,
            payment: order.payment,

            deliveryAgent: order.deliveryAgent?.toString() ?? null,

            deliveredAt: order.deliveredAt
                ? order.deliveredAt.toISOString()
                : null,

            createdAt: order.createdAt
                ? order.createdAt.toISOString()
                : null,

            createdBy: order.createdBy?.toString() ?? null,
            shopkeeperId: order.shopkeeperId?.toString() ?? null,

            customer_name: customer?.customerName ?? null,
            customer_address: customer?.customerAddress ?? null,
            customer_landmark: customer?.landmark ?? null,
            customer_contact: customer?.customerContact ?? null,

            shop_name: shop?.shopName ?? null,
            shop_id: shop?._id?.toString() ?? null,
            shop_email: shop?.email ?? null,
            shop_owner: shop?.ownerName ?? null,
            shop_address: shop?.shopAddress ?? null,
            shop_contact: shop?.ownerContact ?? null,
        }
    })


    return mappedOrders
}

