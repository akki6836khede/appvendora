"use client"

import React from 'react'
import { getArray } from '@/actions/getProducts'
import useSWR from "swr"
import Image from 'next/image';
import Loading from './loadingAnimation';

import { cartProduct } from '@/actions/addToCart';

const Products = ({ shopID, bool1, setBool1 }) => {
    const fetcher = async () => await getArray(shopID)
    const { data: productarr = [], error, isLoading } = useSWR(
        shopID ? ["products", shopID] : null,
        () => getArray(shopID),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )
    console.log(shopID)
    return (
        <div className='w-[95%] lg:w-[100%] h-[90%] rounded-md bg-black/95 flex flex-col justify-evenly backdrop-blur-lg items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[98%] h-[10%] text-2xl text-white flex justify-start items-center">
                <div className='text-[20px] text-violet-200'>
                    Products
                </div>
            </div>
            <div className="lower w-[98%] h-[88%] flex flex-wrap gap-4 justify-evenly lg:justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {productarr
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[90%] md:w-[45%] lg:w-[24%] rounded-2xl hover:bg-zinc-900 flex-shrink-0 h-100 shadow-[0_0_40px_rgba(0,0,0,0.25) bg-zinc-800 flex flex-col justify-evenly items-center">
                                <div className="upper w-[98%] h-[70%] flex justify-center items-center">
                                    <div className="w-[200px] mt-4 aspect-square rounded-xl flex justify-center items-center relative">
                                        <Image
                                            src={item.shopImage}
                                            alt="img"
                                            fill
                                            className="object-cover border-zinc-800 rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div className="lower h-[30%] w-[95%] flex flex-col justify-evenly items-center">
                                    <div className="up text-gray-300 font-bold text-[15px]">{item.productName}</div>
                                    <div className="low text-bold text-green-500 font-bold">{item.productPrice}/-</div>

                                    {
                                        item.productStock > 0 ?
                                            <button className='w-30 shadow-lg hover:scale-103 cursor-pointer text-[15px] flex justify-evenly items-center h-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-gray-200 rounded-md' onClick={async () => {
                                                cartProduct(item)
                                            }}><span className="material-symbols-outlined !text-white !text-[17px]">add_shopping_cart</span>Add to cart</button> :
                                            <button className='w-30 shadow-lg hover:scale-103 cursor-pointer text-[15px] flex justify-evenly items-center h-6 bg-gradient-to-r from-gray-600 to-zinc-600 hover:from-gray-700 hover:to-zinc-700 text-gray-200 rounded-md' ><span className="material-symbols-outlined !text-white !text-[17px]">add_shopping_cart</span>Add to cart</button>
                                    }
                                    <div className='text-[13px] text-blue-500'>{item.productStock} left in stock</div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Products
