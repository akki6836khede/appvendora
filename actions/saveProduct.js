"use server"

import { connectToProductDB } from "@/lib/productdb"
import { getProductModel } from "@/models/product"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { connectToShopkeeperDB } from "@/lib/shopkeeperdb"
import { getShopModel } from "@/models/Shopkeeper"

import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

export async function saveProduct(formData) {
  const productConn = await connectToProductDB()
  const shopConn = await connectToShopkeeperDB()
  const shop = getShopModel(shopConn)

  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Not authenticated")

  const email = session.user?.email
  const user = await shop.findOne({ email })
  if (!user) throw new Error("User not found")

  const userId = user._id

  const productName = formData.get("productName")
  const productPrice = Number(formData.get("productPrice"))
  const productStock = Number(formData.get("productStock"))
  const shopImage = formData.get("shopImage")

  let imageUrl = "";
    if (shopImage && shopImage.arrayBuffer) {
      const buffer = Buffer.from(await shopImage.arrayBuffer());
  
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'shop_images' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(buffer);
      });
  
      imageUrl = uploadResult.secure_url;
    }

  const Product = getProductModel(productConn)

  await Product.create({
    productName,
    productPrice,
    productStock,
    shopImage: imageUrl || null,
    createdBy: userId,
  })
  revalidatePath(`/userpage/${email}`)
  return { success: true }
}
