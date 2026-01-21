"use server"

import { connectToCustomerDB } from "@/lib/customerdb"
import { getCustomerModel } from "@/models/customer"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function saveCustomer(formData) {
  const customerConn = await connectToCustomerDB()

  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) throw new Error("Not authenticated")

  const email = session?.user?.email

  const customerName = formData.get("customerName")
  const customerAddress = formData.get("customerAddress")
  const customerLatitude = Number(formData.get("customerLatitude"))
  const customerLongitude = Number(formData.get("customerLongitude"))
  const landmark = formData.get("landmark")
  const customerContact = formData.get("customerContact")

  const Cust = getCustomerModel(customerConn)

  await Cust.create({
    customerName,
    customerContact,
    customerAddress,
    customerLatitude,
    customerLongitude,
    landmark,
    email
  })
  return { success: true }
}