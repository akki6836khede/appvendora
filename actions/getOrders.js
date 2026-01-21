"use server"

import { connectToOrderDB } from "@/lib/orderdb"
import { getOrderModel } from "@/models/orders"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { connectToShopkeeperDB } from "@/lib/shopkeeperdb"
import { getShopModel } from "@/models/Shopkeeper"

import { revalidatePath } from "next/cache"

export async function getOrderArray() {
    const orderConn = await connectToOrderDB()
    const shopConn = await connectToShopkeeperDB()
    const Shop = getShopModel(shopConn)

    const session = await getServerSession(authOptions)
    if (!session) throw new Error("Not authenticated")

    const email = session.user?.email

    const user = await Shop.findOne(
        { email }
    );

    const userId = user._id
    const Order = getOrderModel(orderConn)

    const products = await Order.find({ shopkeeperId: userId }).lean()
    revalidatePath(`/userpage/${email}`)
    return products.map(product => ({
        ...product,
        _id: product._id.toString(),
        createdBy: product.createdBy.toString(),
        shopkeeperId: product.shopkeeperId.toString(),
        deliveryAgent: product?.deliveryAgent?.toString() || null
    })
    )
}