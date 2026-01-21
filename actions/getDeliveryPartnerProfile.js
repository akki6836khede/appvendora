"use server"

import { connectToDeliveryDB } from "@/lib/deliverydb"
import { getDeliveryModel } from "@/models/delivery"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function getDeliveryProfile(formData) {
  const deliveryConn = await connectToDeliveryDB()

  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) throw new Error("Not authenticated")

  const email = session?.user?.email
  const image = session?.user?.image

  const Delivery = getDeliveryModel(deliveryConn)

  const profileDoc = await Delivery.findOne({email})
  const profile = JSON.parse(JSON.stringify(profileDoc))
  profile.image = image
  return profile
}