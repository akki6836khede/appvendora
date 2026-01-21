"use client"

import React, { useState } from 'react'
import { getArray } from '@/actions/getProducts'
import useSWR from "swr"
import ChangeStock from './changeStock'
import ChangePrice from './changePrice'
import { useSession } from "next-auth/react"
import Loading from './loadingAnimation';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />


const MyProducts = ({ shopID }) => {

    const { data: session, status } = useSession()


    const email = session?.user?.email

    const fetcher = async () => await getArray(shopID)
    const { data: myproductarr = [], error, isLoading } = useSWR(
        shopID ? ["myproducts", shopID] : null,
        () => getArray(shopID),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )

    const [showadder1, setShowadder1] = useState(false);
    const [showadder2, setShowadder2] = useState(false);
    const [id, setId] = useState(null)

    if (status === "loading" || isLoading) {
        return <Loading />;
    }

    return (
        <div className='w-[95%] lg:w-[70%] h-[90%] rounded-md bg-black/95 flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            {
                showadder2 &&
                <ChangeStock setShowAdder={setShowadder2} _id={id}></ChangeStock>
            }
            {
                showadder1 &&
                <ChangePrice setShowAdder={setShowadder1} _id={id}></ChangePrice>
            }
            <div className="upper w-[95%] h-[10%] lg:h-[12%] text-2xl text-white flex justify-start items-center">
                <div className='text-[20px] text-violet-200'>
                    My products
                </div>
            </div>
            <div className="w-[95%] h-12 shadow-[0_0_40px_rgba(0,0,0,0.25) hidden lg:flex justify-between items-center rounded-md">
                <div className="productName w-[30%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Product Name</div>
                <div className="productPrice w-[18%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Price</div>
                <div className="customerName w-[20%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Stock</div>
                <div className="customerAddress w-[30%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Actions</div>

            </div>
            <div className="lower w-[95%] h-[90%] lg:h-[70%] flex flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {myproductarr
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] flex-shrink-0 lg:bg-transparent bg-zinc-900 lg:border-0 border-1 border-blue-500/40 h-48 lg:h-12 relative shadow-[0_0_40px_rgba(0,0,0,0.25) lg:flex-row flex-col flex justify-evenly lg:justify-between items-center rounded-xl lg:rounded-md">
                                <div className="productName w-[90%] lg:w-[30%] lg:bg-zinc-900 text-gray-300 border-0 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='text-gray-200 font-bold mr-4 lg:hidden flex'>Product name</span>{item.productName}</div>
                                <div className="productPrice w-[90%] lg:w-[18%] lg:bg-zinc-900 text-green-400 border-0 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='text-gray-200 font-bold mr-4 lg:hidden flex'>Price</span>{item.productPrice}/-</div>
                                <div className={`customerName w-[90%] lg:w-[20%] lg:bg-zinc-900 ${item.productStock < 10 && item.productStock >= 0
                                    ? 'text-red-500'
                                    : item.productStock < 50 && item.productStock >= 10
                                        ? 'text-yellow-500'
                                        : 'text-green-500'
                                    } text-gray-300 border-0 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]`}><span className='text-gray-200 font-bold mr-4 lg:hidden flex'>Product stock</span>{item.productStock}</div>
                                <div className="customerAddress w-[90%] lg:w-[30%] lg:bg-zinc-900 text-gray-300 border-0 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start lg:justify-evenly hover:bg-zinc-700 items-center text-[15px]">
                                    <button className='w-25 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-700 hover:scale-103 hover:from-green-600 hover:to-green-900 text-white tex-[15px]'
                                        onClick={() => {
                                            setId(item._id)
                                            setShowadder1(prev => !prev)
                                        }}>
                                        Change price
                                    </button>
                                    <button className='w-25 h-8 rounded-full lg:ml-0 ml-8 bg-gradient-to-br from-blue-400 to-blue-700 hover:scale-103 hover:from-blue-600 hover:to-blue-900 text-white tex-[15px]'
                                        onClick={() => {
                                            setId(item._id)
                                            setShowadder2(prev => !prev)
                                        }}>
                                        Change stock
                                    </button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default MyProducts
