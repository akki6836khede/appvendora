"use server"

import { connectToDeliveryDB } from "@/lib/deliverydb"
import { getDeliveryModel } from "@/models/delivery"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'drgvfdtx0',
  api_key: '221124866534351',
  api_secret: '3fSjHURAfQdlZTxbwgY8u-XQAuQ'
})


export default async function saveDeliveryPartner(formData) {
  const deliveryConn = await connectToDeliveryDB()

  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) throw new Error("Not authenticated")

  const email = session?.user?.email

  const partnerName = formData.get("partnerName")
  const vehicleCategory = formData.get("vehicleCategory")
  const deliveryContact = formData.get("deliveryContact")
  const baseAddress = formData.get("baseAddress")
  const deliveryLatitude = Number(formData.get("deliveryLatitude"))
  const deliveryLongitude = Number(formData.get("deliveryLongitude"))
  const avaibilityCheck = Boolean(formData.get("avaibilityCheck"))


  const shopImage = formData.get("deliveryBoyID")
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

  const Delivery = getDeliveryModel(deliveryConn)

  await Delivery.create({
    partnerName,
    vehicleCategory,
    deliveryContact,
    baseAddress,
    deliveryLatitude,
    deliveryLongitude,
    deliveryBoyID: imageUrl,
    avaibilityCheck,
    email
  })
  return { success: true }
}