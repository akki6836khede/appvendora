"use server";

import razorpay from "@/lib/razorpay";

export async function createOrder(amount) {
    const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    });

    return order;
}
