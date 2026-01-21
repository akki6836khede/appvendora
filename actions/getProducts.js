"use server";

import { connectToProductDB } from "@/lib/productdb";
import { getProductModel } from "@/models/product";

export async function getArray(shopID) {
  const productConn = await connectToProductDB();
  const product = getProductModel(productConn);

  const array = await product.find({ createdBy: shopID }).lean();

  return array.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    createdBy: doc.createdBy.toString(),
  }));
}