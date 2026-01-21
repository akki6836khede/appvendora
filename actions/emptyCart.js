"use server"

import { connectToCartDB } from "@/lib/cartdb"
import { getCartModel } from "@/models/usercart"


export async function emptyTheCart(cart) {
    const cartConn = await connectToCartDB()
    const Cart = getCartModel(cartConn)

    const productIds = [...new Set(
        cart.map(item => item.createdBy.toString())
    )]

    await Cart.deleteMany({
        createdBy: { $in: productIds }
    })

    return { success: true }
}