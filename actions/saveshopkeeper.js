"use server"

import { connectToShopkeeperDB } from "@/lib/shopkeeperdb"
import { getShopModel } from "@/models/Shopkeeper"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'drgvfdtx0',
  api_key: '221124866534351',
  api_secret: '3fSjHURAfQdlZTxbwgY8u-XQAuQ'
})


export default async function saveShopkeeper(formData) {
  const shopConn = await connectToShopkeeperDB()

  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) throw new Error("Not authenticated")

  const email = session?.user?.email

  const shopName = formData.get("shopName")
  const shopLatitude = Number(formData.get("shopLatitude"))
  const shopLongitude = Number(formData.get("shopLongitude"))
  const ownerName = formData.get("ownerName")
  const shopCategory = formData.get("shopCategory")
  const ownerContact = formData.get("ownerContact")
  const shopAddress = formData.get("shopAddress")


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


  const openingTime = formData.get("openingTime")
  const closingTime = formData.get("closingTime")

  const Shop = getShopModel(shopConn)

  await Shop.create({
    shopName,
    ownerName,
    shopCategory,
    ownerContact,
    shopAddress,
    shopLatitude,
    shopLongitude,
    email,
    shopImage: imageUrl || null,
    openingTime,
    closingTime,
  })
  return { success: true }
}