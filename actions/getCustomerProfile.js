"use server"

import { connectToCustomerDB } from "@/lib/customerdb"
import { getCustomerModel } from "@/models/customer"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function getCustomerData(formData) {
  const customerConn = await connectToCustomerDB()

  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) throw new Error("Not authenticated")

  const email = session?.user?.email
  const image = session?.user?.image

  const Customer = getCustomerModel(customerConn)

  const profileDoc = await Customer.findOne({email})
  const profile = JSON.parse(JSON.stringify(profileDoc))
  profile.image = image
  return profile
}