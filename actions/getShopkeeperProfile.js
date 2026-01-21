"use server"

import { connectToShopkeeperDB } from "@/lib/shopkeeperdb"
import { getShopModel } from "@/models/Shopkeeper"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function getShopkeeperProfile() {
    const shopConn = await connectToShopkeeperDB()
    const Shop = getShopModel(shopConn)

    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) throw new Error("Not authenticated")

    const email = session?.user?.email
    const image = session?.user?.image

    const profileDoc = await Shop.findOne({ email })
    const profile = JSON.parse(JSON.stringify(profileDoc))
    profile.image = image
    return profile
}