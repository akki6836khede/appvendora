"use client"

import React from 'react'
import { getOrderArray } from '@/actions/getOrders';
import useSWR from "swr"
import Image from 'next/image';
import { useSession } from "next-auth/react"
import getCustomerName from '@/actions/getCustomerName';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from './loadingAnimation';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />


const Orders = ({ bool5, setBool5 }) => {
    const { data: session, status } = useSession()


    const email = session?.user?.email

    const shouldFetch = Boolean(email);

    const fetcher = async () => await getOrderArray()
    const { data: orderarr = [], error, isLoading } = useSWR(
        shouldFetch ? ["orders", { email }] : null,
        () => getOrderArray(),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )


    const [ordersWithExtra, setOrdersWithExtra] = useState([])

    useEffect(() => {
        if (!orderarr.length) return

        const loadExtra = async () => {
            const updated = await Promise.all(
                orderarr.map(async (order) => {
                    const customer = await getCustomerName(order.createdBy)
                    return {
                        ...order,
                        customerName: customer.name_c,
                        customerAddress: customer.address_c,
                        customerLandmark: customer.landmark_c,
                    }
                })
            )

            setOrdersWithExtra(updated)
        }

        loadExtra()
    }, [orderarr])

    if (status === "loading" || isLoading) {
        return <Loading />;
    }

    console.log(orderarr)
    return (
        <div className='w-[95%] lg:w-[100%] h-[90%] rounded-md bg-black/95 flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[95%] lg:w-[98%] h-[10%] lg:h-[12%] text-2xl text-white flex justify-start items-center">
                <div className='text-[20px] text-violet-200'>
                    Orders
                </div>
            </div>
            <div className="w-[98%] h-0 lg:h-12 shadow-[0_0_40px_rgba(0,0,0,0.25) hidden lg:flex justify-between items-center rounded-md">
                <div className="productName w-[11%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Product Name</div>
                <div className="productPrice w-[5%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Price</div>
                <div className="customerName w-[14%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Customer Name</div>
                <div className="customerAddress w-[29%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Address</div>
                <div className="customerLandmark w-[19%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Landmark</div>

                <div className="taken w-[6%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Assigned</div>
                <div className="delivered w-[6%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Delivered</div>
                <div className="payment w-[6%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Payment</div>

            </div>
            <div className="lower w-[95%] lg:w-[98%] h-[85%] lg:h-[70%] flex flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {ordersWithExtra
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] border-1 border-blue-500/40 rounded-2xl lg:rounded-md lg:bg-transparent bg-zinc-900 lg:border-0 flex-shrink-0 h-96 lg:h-12 shadow-[0_0_40px_rgba(0,0,0,0.25) flex flex-col lg:flex-row justify-between items-center">
                                <div className="w-[90%] productName lg:w-[11%] lg:bg-zinc-900 text-gray-300 lg:border-1 border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 lg:hover:bg-zinc-700 items-center text-[15px]"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Product name</span>{item.productName}</div>
                                <div className="w-[90%] productPrice lg:w-[5%] lg:bg-zinc-900 text-green-400 lg:border-1 border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 lg:hover:bg-zinc-700 items-center text-[15px]"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Price</span>{item.productPrice}/-</div>
                                <div className="w-[90%] customerName lg:w-[14%] lg:bg-zinc-900 text-gray-300 lg:border-1 border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 lg:hover:bg-zinc-700 items-center text-[15px]"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Customer name</span>{item.customerName}</div>
                                <div className="w-[90%] customerAddress lg:w-[29%] lg:bg-zinc-900 text-gray-300 lg:border-1 border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 lg:hover:bg-zinc-700 items-center text-[15px]"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Customer address</span>{item.customerAddress}</div>
                                <div className="w-[90%] customerLandmark lg:w-[19%] lg:bg-zinc-900 text-gray-300 lg:border-1 border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 lg:hover:bg-zinc-700 items-center text-[15px]"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Land mark</span>{item.customerLandmark}</div>
                                <div className="w-[90%] taken border-blue-500/40 lg:w-[6%] h-[100%] rounded-md flex justify-start lg:pl-0 pl-2 lg:justify-center lg:hover:bg-zinc-700 lg:bg-zinc-900 text-gray-900 lg:border-1 items-center text-[14px] font-bold"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Assignment status</span><span className={`material-symbols-outlined ${item.taken ? 'text-green-500' : 'text-gray-400'
                                    }`}>check_circle</span></div>
                                <div className="w-[90%] delivered border-blue-500/40 lg:w-[6%] h-[100%] rounded-md flex justify-start lg:pl-0 pl-2 lg:justify-center lg:hover:bg-zinc-700 lg:bg-zinc-900 text-gray-900 lg:border-1 items-center text-[14px] font-bold"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Delivery status</span><span className={`material-symbols-outlined ${item.delivered ? 'text-green-500' : 'text-gray-400'
                                    }`}>check_circle</span></div>
                                <div className="w-[90%] payment border-blue-500/40 lg:w-[6%] h-[100%] rounded-md flex justify-start pl-2 lg:hover:bg-zinc-700 lg:bg-zinc-900 text-gray-900 lg:border-1 items-center text-[14px] font-bold"><span className='lg:hidden flex justify-start items-center text-gray-200 pr-4 font-bold'>Payment status</span>
                                    {
                                        item.payment ? <span className='text-[15px] text-green-400'>Done</span> : <span className='text-[15px] text-blue-400'>Pending</span>
                                    }
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Orders
