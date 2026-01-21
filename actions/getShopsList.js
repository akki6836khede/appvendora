"use server"

import { connectToShopkeeperDB } from "@/lib/shopkeeperdb"
import { getShopModel } from "@/models/Shopkeeper"

const getShopsList = async () => {
  const shopConn = await connectToShopkeeperDB()
  const Shop = getShopModel(shopConn)

  const shops = await Shop.find().lean()

  return shops.map(shop => ({
    ...shop,
    _id: shop._id.toString(),
    createdAt: shop.createdAt?.toISOString(),
    updatedAt: shop.updatedAt?.toISOString(),
  }))
}

export default getShopsList
