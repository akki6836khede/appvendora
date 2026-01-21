"use server";

import { connectToProductDB } from "@/lib/productdb";
import { getProductModel } from "@/models/product";

export async function updateStockOrPrice(formData, func) {
    const productConn = await connectToProductDB();
    const product = getProductModel(productConn);

    if (func === "stock") {
        const _id = formData.get("_id")
        const stock = formData.get("stock")
        await product.findByIdAndUpdate(_id, { productStock: stock }, { new: true })
    }

    if (func === "price") {
        const _id = formData.get("_id")
        const price = formData.get("price")
        await product.findByIdAndUpdate(_id, { productPrice: price }, { new: true })
    }

    return { succes: true }
}