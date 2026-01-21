"use server"

import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"

import { connectToCustomerDB } from "@/lib/customerdb"
import { getCustomerModel } from "@/models/customer"

export async function getCustomerName(id) {
    if (!id) return null

    await connectToDB()
    const customerConn = await connectToCustomerDB()
    const Cust = getCustomerModel(customerConn)

    const user = await User.findById(id).lean()
    if (!user?.email) return null

    const customer = await Cust.findOne({ email: user.email }).lean()
    if (!customer) return null

    return {
        address_c: customer.customerAddress ?? null,
        name_c: customer.customerName ?? null,
        landmark_c: customer.landmark ?? null
    }
}

export default getCustomerName
