"use client";

import { createOrder } from "@/actions/createOrder";
import { saveOrder } from "@/actions/saveOrderDetails";
import { settleCOD } from "@/actions/settleCOD";
import { mutate } from "swr";
import { emptyTheCart } from "@/actions/emptyCart";

export default function PayButton({ className, children, total, cart, shopkeeperId, customerPayment, email, cust_email }) {
  console.log(cart)
  const handlePayment = async () => {
    const order = await createOrder(total);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Vendora Ecommerce",
      description: "Test Payment",
      order_id: order.id,

      handler: async function (response) {
        console.log("Payment Success:", response);
        alert("Payment successful!");
        if (customerPayment) {
          await saveOrder(cart, shopkeeperId, true)
          await emptyTheCart(cart)
          mutate(["carts", { cust_email }])
        } else {
          const ORDER_KEYS = new Set([
            "orders",
            "availbleorders",
            "sales"
          ]);

          const res = await settleCOD(email);

          if (res?.success) {
            mutate(key => Array.isArray(key) && ORDER_KEYS.has(key[0]));
          }
        }
      },

      prefill: {
        name: "Customer",
        email: "test@example.com",
        contact: "9857344512",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className={className}
    >
      {children || "Pay Now"}
    </button>
  );
}

