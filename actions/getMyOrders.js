"use server"

import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"

import getShopName from "./getShopkeeperName"

export async function getMyOrders(email) {
    await connectToDB()
    const arr = await getShopName()

    const doc = await User.findOne({ email: email }).lean()

    return arr.filter(item => item.createdBy === doc._id.toString())
}
