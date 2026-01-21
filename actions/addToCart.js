"use server"

import mongoose from "mongoose"

import { connectToCartDB } from "@/lib/cartdb"
import { getCartModel } from "@/models/usercart"

import { connectToProductDB } from "@/lib/productdb"
import { getProductModel } from "@/models/product"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'drgvfdtx0',
  api_key: '221124866534351',
  api_secret: '3fSjHURAfQdlZTxbwgY8u-XQAuQ'
})

export async function cartProduct(obj) {
  const cartConn = await connectToCartDB()
  const productConn = await connectToProductDB()

  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Not authenticated")

  const email = session.user?.email

  await connectToDB();

  const user = await User.findOne(
    { email }
  );

  const userId = user._id

  const shopImage = obj.shopImage
  const productName = obj.productName
  const productPrice = obj.productPrice
  const id = obj._id
  let imageUrl = obj.shopImage

  const Cart = getCartModel(cartConn)
  const Product = getProductModel(productConn)


  const st = await Product.findById(id);
  const sId = st.createdBy

  await Cart.create({
    productName,
    productPrice,
    shopImage: imageUrl || null,
    createdBy: userId,
    shopkeeperId: sId,
    productId: id
  })
  revalidatePath(`/userpage/${email}`)
  return { success: true }
}
