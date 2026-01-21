"use client"

import React from 'react'
import getShopName from '@/actions/getShopkeeperName';
import useSWR from "swr"
import { useSession } from "next-auth/react"
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import Loading from './loadingAnimation';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />


const Sales = ({ bool5, setBool5 }) => {
    const { data: session, status } = useSession()


    const email = session?.user?.email

    const shouldFetch = Boolean(email);

    const fetcher = async () => await getShopName()
    const { data: salesarr = [], error, isLoading } = useSWR(
        shouldFetch ? ["sales", { email }] : null,
        () => getShopName(),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )

    const ordersWithExtra = useMemo(() => {
        return salesarr.filter(
            item =>
                item.shop_email === email &&
                item.delivered === true
        )
    }, [salesarr, email])

    const totalRevenue = useMemo(() => {
        return ordersWithExtra.reduce((sum, item) => sum + item.productPrice, 0);
    }, [ordersWithExtra]);

    const prepaidAmount = useMemo(() => {
        return ordersWithExtra
            .filter(item => item.payment === true)
            .reduce((sum, item) => sum + item.productPrice, 0);
    }, [ordersWithExtra]);

    const codAmount = useMemo(() => {
        return ordersWithExtra
            .filter(item => !item.payment)
            .reduce((sum, item) => sum + item.productPrice, 0);
    }, [ordersWithExtra]);

    const deliveredCount = useMemo(() => {
        return ordersWithExtra.length;
    }, [ordersWithExtra]);


    if (status === "loading" || isLoading) {
        return <Loading />;
    }


    return (
        <div className='w-[95%] lg:w-[100%] h-[90%] rounded-md bg-black/95 flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[95%] lg:w-[98%] h-[12%] text-2xl text-white flex justify-between items-center">
                <div className='text-[12px] md:text-[15px] lg:text-[20px] text-violet-200'>
                    Total Orders: <span className='pl-1 font-bold text-blue-400'>{deliveredCount}</span>
                </div>
                <div className="text-[12px] md:text-[15px] lg:text-[20px] text-violet-200">
                    Total Revenue: <span className='pl-1 font-bold text-green-400'>{totalRevenue}</span>
                </div>
                <div className="text-[12px] md:text-[15px] lg:text-[20px] text-violet-200">
                    Prepaid Amount: <span className='pl-1 font-bold text-green-400'>{prepaidAmount}</span>
                </div>
                <div className="text-[12px] md:text-[15px] lg:text-[20px] text-violet-200">
                    Pending Amount: <span className='pl-1 font-bold text-green-400'>{codAmount}</span>
                </div>
            </div>
            <div className="w-[98%] h-12 shadow-[0_0_40px_rgba(0,0,0,0.25) hidden lg:flex justify-between items-center rounded-md">
                <div className="productName w-[20%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Product Name</div>
                <div className="productPrice w-[8%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Price</div>
                <div className="customerName w-[20%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Customer Name</div>
                <div className="customerAddress w-[20%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">ordered at</div>
                <div className="customerLandmark w-[20%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">delivered at</div>
                <div className="payment w-[10%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Payment</div>

            </div>
            <div className="lower w-[95%] lg:w-[98%] h-[85%] lg:h-[70%] flex flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {ordersWithExtra
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] flex-shrink-0 h-72 lg:h-12 lg:rounded-md rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.25) lg:bg-transparent bg-zinc-900 border-blue-500/40 border-1 lg:border-0  flex flex-col lg:flex-row justify-evenly lg:justify-between items-center">
                                <div className="productName w-[90%] lg:w-[20%] bg-zinc-900 text-gray-300 border-0 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='font-bold text-gray-200 mr-4 lg:hidden flex'>Product name</span>{item.productName}</div>
                                <div className="productPrice w-[90%] lg:w-[8%] bg-zinc-900 text-green-400 border-0 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='font-bold text-gray-200 mr-4 lg:hidden flex'>Price</span>{item.productPrice}/-</div>
                                <div className="customerName w-[90%] lg:w-[20%] bg-zinc-900 text-gray-300 border-0 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='font-bold text-gray-200 mr-4 lg:hidden flex'>Customer name</span>{item.customer_name}</div>
                                <div className="customerAddress w-[90%] lg:w-[20%] bg-zinc-900 text-gray-300 border-0 lg:border lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='font-bold text-gray-200 mr-4 lg:hidden flex'>Ordered date</span>
                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Kolkata'
                                    }) : 'Pending'}
                                </div>

                                <div className="customerLandmark w-[90%] lg:w-[20%] bg-zinc-900 text-gray-300 border-0 lg:border lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='font-bold text-gray-200 mr-4 lg:hidden flex'>Delivery date</span>
                                    {item.deliveredAt ? new Date(item.deliveredAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Kolkata'
                                    }) : 'Not Delivered'}
                                </div>
                                <div className="payment lg:border-blue-500/40 w-[90%] lg:w-[10%] h-[100%] rounded-md flex justify-start pl-2 hover:bg-zinc-700 bg-zinc-900 text-gray-900 border-0 lg:border-1 items-center text-[14px] font-bold"><span className='font-bold text-gray-200 mr-4 lg:hidden flex'>Payment status</span>
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

export default Sales
