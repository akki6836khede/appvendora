"use client"

import React from 'react'
import Image from 'next/image'
import { getCartArray } from '@/actions/getCartData'
import useSWR from "swr"
import { useState } from 'react'
import { useEffect } from 'react'
import { useSession } from "next-auth/react"
import Loading from './loadingAnimation'
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />
import { removeFromCart } from '@/actions/removeFromCart'
import { mutate } from 'swr'

const Cart = ({ setBool2, bool2, bool4, setBool4, total, setTotal, cart, setCart }) => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    const email = session?.user?.email
    const fetcher = async () => await getCartArray()
    const { data: cartarr = [], error, isLoading } = useSWR(
        { email } ? ["carts", { email }] : null,
        () => getCartArray(),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )

    console.log("hello", cartarr)
    const totalPrice = cartarr.reduce((sum, item) => {
        return sum + Number(item.productPrice);
    }, 0);
    useEffect(() => {
        setTotal(totalPrice);
    }, [totalPrice, setTotal]);
    if (status === "loading" || isLoading) {
        return <Loading />;
    }
    return (
        <div className='w-[95%] lg:w-[45%] h-[90%] rounded-md backdrop-blur-lg bg-black/95 flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[90%] h-[10%] text-2xl text-white flex justify-start items-center">
                <div className='text-[20px] text-violet-200'>
                    Cart products
                </div>
            </div>
            <div className="lower w-[90%] h-[70%] flex flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {cartarr
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] flex-shrink-0 h-30 shadow-[0_0_40px_rgba(0,0,0,0.25) rounded-2xl bg-zinc-800 hover:bg-zinc-900 flex justify-evenly items-center">
                                <div className="upper w-[30%] h-[100%] flex justify-center items-center">
                                    <div className="w-[90%] h-[90%] aspect-square rounded-xl flex justify-center items-center relative">
                                        <Image
                                            src={item.shopImage}
                                            alt="img"
                                            fill
                                            className="object-cover border-zinc-800 rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div className="lower h-[100%] w-[70%] flex justify-evenly items-center">
                                    <div className="up text-gray-300 font-bold w-[50%] flex justify-start items-center">{item.productName}</div>
                                    <div className="low text-bold text-green-600 font-bold w-[20%] flex justify-start items-center">{item.productPrice}/-</div>
                                    <div className='w-[10%] flex justify-start items-center'>
                                        <button className='w-9 h-9 cursor-pointer rounded-full bg-gradient-to-r from-red-500 to-pink-700 flex justify-center items-center' onClick={async () => {
                                            await removeFromCart(item)
                                            mutate(["carts", { email }])
                                        }}>
                                            <span className="material-symbols-outlined !text-white">remove_shopping_cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <button className='w-30 h-8 cursor-pointer rounded-md bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-700 hover:to-violet-700 text-white text-[15px]' onClick={() => {
                setBool4(prev => !prev)
                setBool2(prev => !prev)
                setCart(cartarr)
            }}>
                Proceed to buy
            </button>
        </div>
    )
}

export default Cart
