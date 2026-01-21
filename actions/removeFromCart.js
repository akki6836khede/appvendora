"use server"

import { connectToCartDB } from "@/lib/cartdb"
import { getCartModel } from "@/models/usercart"

import { revalidatePath } from "next/cache"

export async function removeFromCart(obj) {
    const cartConn = await connectToCartDB()
    const Cart = getCartModel(cartConn)

    await Cart.deleteOne({ _id: obj._id })

    return { success: true }
}
