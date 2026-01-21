"use client"

import React from 'react'
import getShopName from '@/actions/getShopkeeperName';
import useSWR, { mutate } from "swr"
import { useSession } from "next-auth/react"
import { orderFunctionality } from '@/actions/availableOrderActions';
import Loading from './loadingAnimation';


const AvailableOrders = ({ bool5, setBool5 }) => {
    const { data: session, status } = useSession()

    const email = session?.user?.email

    const shouldFetch = Boolean(email);

    const fetcher = async () => await getShopName()
    const { data: availableordersarr = [], error, isLoading } = useSWR(
        shouldFetch ? ["availbleorders", { email }] : null,
        () => getShopName(),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )

    if (status === "loading" || isLoading) {
        return <Loading />;
    }

    return (
        <div className='w-[95%] lg:w-[100%] h-[90%] rounded-md bg-black/95 flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[95%] lg:w-[98%] h-[10%] text-2xl text-white flex justify-start items-center">
                <div className='text-[20px] text-violet-200'>
                    Available Orders
                </div>
            </div>
            <div className="lower w-[95%] lg:w-[98%] h-[90%] flex flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {availableordersarr
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] hover:bg-zinc-800 flex-shrink-0 h-144 lg:h-48 shadow-[0_0_40px_rgba(0,0,0,0.25) flex lg:flex-row flex-col justify-evenly items-center rounded-2xl lg:rounded-md bg-zinc-900 border-1 border-blue-500/40">
                                <div className="pl-2 left w-[100%] lg:w-[30%] h-[30%] lg:h-[100%] border-r-0 lg:border-r-1 lg:border-b-0 border-b-1 border-blue-500/40 lg:border-r-blue-500/40 flex flex-col justify-evenly items-center">
                                    <div className="productName w-[100%] flex justify-start items-center text-gray-400">
                                        Product name:<span className='text-white font-medium mx-2'>{item.productName}</span>
                                    </div>
                                    <div className="productPrice w-[100%] flex justify-start items-center text-gray-400">
                                        Product price:<span className='text-green-500 mx-2'>{item.productPrice}</span>
                                    </div>
                                    <div className="customer_name w-[100%] flex justify-start items-center text-gray-400">
                                        Customer name:<span className='text-white font-medium mx-2'>{item.customer_name}</span>
                                    </div>
                                    <div className="customer_contact w-[100%] flex justify-start items-center text-gray-400">
                                        Customer contact:<span className='text-blue-400 mx-2'>{item.customer_contact}</span>
                                    </div>
                                    <div className="shop_contact w-[100%] flex justify-start items-center text-gray-400">
                                        Shop contact:<span className='text-blue-400 mx-2'>{item.shop_contact}</span>
                                    </div>
                                </div>
                                <div className="pl-2 right w-[100%] lg:w-[50%] h-[50%] lg:h-[100%] flex flex-col lg:border-b-0 border-b-1 border-blue-500/40 border-r-0 lg:border-r-1 lg:border-r-blue-500/40 justify-evenly items-center">
                                    <div className="customer_address w-[100%] justify-start items-center text-gray-400">
                                        Customer address:<span className='text-gray-300 mx-2'>{item.customer_address}</span>
                                    </div>
                                    <div className="shopkeeper_address w-[100%] justify-start items-center text-gray-400">
                                        Shopkeeper address:<span className='text-gray-300 mx-2'>{item.shop_address}</span>
                                    </div>
                                    <div className="customer_landmark w-[100%] justify-start items-center text-gray-400">
                                        Customer landmark:<span className='text-gray-300 mx-2'>{item.customer_landmark}</span>
                                    </div>
                                    <div className="shop_name w-[100%] flex justify-start items-center text-gray-400">
                                        Shop name:<span className='text-white font-medium mx-2'>{item.shop_name}</span>
                                    </div>
                                    <div className="shop_owner w-[100%] flex justify-start items-center text-gray-400">
                                        Owner name:<span className='text-gray-400 mx-2'>{item.shop_owner}</span>
                                    </div>
                                </div>
                                <div className="pl-2 left w-[100%] lg:w-[20%] h-[10%] lg:h-[100%] border-r-0 lg:border-r-1 lg:border-r-blue-500/40 flex flex-row lg:flex-col justify-evenly items-center">
                                    {
                                        item.payment ? <div className='flex justify-center items-center bg-gradient-to-r from-green-400 cursor-pointer to-green-800 hover:from-green-500 hover:to-green-900 text-white text-[15px] w-25 md:w-30 h-8 font-bold rounded-full'>Done</div> : <div className='flex justify-center items-center bg-gradient-to-r from-red-400 to-red-800 cursor-pointer hover:from-red-500 hover:to-red-900 text-white text-[15px] font-bold w-25 md:w-30 h-8 rounded-full'>Pending</div>
                                    }
                                    {
                                        item.delivered ? <button className='bg-gradient-to-r cursor-pointer from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-900 text-[15px] rounded-full font-bold text-white w-25 md:w-30 h-8'>Delivered</button> : <button className='bg-gradient-to-r from-amber-400 to-amber-800 hover:from-amber-500 hover:to-amber-900 rounded-full text-[15px] text-black cursor-pointer font-bold w-25 md:w-30 h-8' onClick={async () => {
                                            await orderFunctionality("go_to_delivered", item._id, email)
                                            mutate(["availbleorders", { email }])
                                        }}>Not Delivered</button>
                                    }
                                    {
                                        item.taken ? <button className='bg-gradient-to-r from-blue-400 to-blue-800 text-[15px] rounded-full hover:from-blue-500 hover:to-blue-900 font-bold text-white w-25 md:w-30 h-8 cursor-pointer' onClick={async () => {
                                            await orderFunctionality("go_to_not_assigned", item._id, email)
                                            mutate(["availbleorders", { email }])
                                        }}>Assigned</button> : <button className='bg-gradient-to-r from-violet-400 to-violet-800 hover:from-violet-500 hover:to-violet-900 rounded-full text-[15px] text-white font-bold w-25 md:w-30 h-8 cursor-pointer' onClick={async () => {
                                            await orderFunctionality("go_to_assigned", item._id, email)
                                            mutate(["availbleorders", { email }])
                                        }}>Not Assigned</button>
                                    }
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default AvailableOrders
