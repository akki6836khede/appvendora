"use server"

import { connectToCartDB } from "@/lib/cartdb"
import { getCartModel } from "@/models/usercart"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

import { revalidatePath } from "next/cache"

import { connectToProductDB } from "@/lib/productdb";
import { getProductModel } from "@/models/product";

export async function getCartArray() {
  const cartConn = await connectToCartDB()

  const productConn = await connectToProductDB()
  const product = getProductModel(productConn)

  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Not authenticated")

  const email = session.user?.email

  const array = await product.find().lean()

  const idMap = new Map(array.map(item => [item._id.toString(), item.productStock]))

  await connectToDB();

  const user = await User.findOne(
    { email }
  );

  const userId = user._id
  const Cart = getCartModel(cartConn)

  const products = await Cart.find({ createdBy: userId }).lean()

  const trimmed = []
  const usedMap = new Map()

  for (const p of products) {
    const id = p.productId.toString()
    const used = usedMap.get(id) || 0
    const stock = idMap.get(id) ?? 0

    if (used < stock) {
      trimmed.push(p)
      usedMap.set(id, used + 1)
    }
  }

  revalidatePath(`/userpage/${email}`)

  return trimmed.map(product => ({
    ...product,
    _id: product._id.toString(),
    createdBy: product.createdBy.toString(),
    shopkeeperId: product.shopkeeperId.toString(),
    productId: product.productId.toString()
  }))

}
