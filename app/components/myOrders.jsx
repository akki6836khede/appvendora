"use client"

import React from 'react'
import { getMyOrders } from '@/actions/getMyOrders';
import useSWR from "swr"
import { useSession } from "next-auth/react"
import Loading from './loadingAnimation';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />


const MyOrders = ({ bool5, setBool5 }) => {
    const { data: session, status } = useSession()


    const email = session?.user?.email

    const shouldFetch = Boolean(email);

    const fetcher = async () => await getMyOrders()
    const { data: myorderarr = [], error, isLoading } = useSWR(
        shouldFetch ? ["customerorders", { email }] : null,
        () => getMyOrders(email),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )

    if (status === "loading" || isLoading) {
        return <Loading />;
    }

    return (
        <div className='w-[95%] lg:w-[100%] h-[90%] backdrop-blur-lg rounded-md bg-black/95 flex flex-col justify-evenly items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="upper w-[95%] h-[10%] lg:h-[12%] text-2xl text-white flex justify-start items-center">
                <div className='text-[20px] text-violet-200'>
                    Orders
                </div>
            </div>
            <div className="w-[95%] h-12 shadow-[0_0_40px_rgba(0,0,0,0.25) hidden lg:flex justify-between items-center rounded-md">
                <div className="productName w-[26%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Product Name</div>
                <div className="productPrice w-[25%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Price</div>

                <div className="taken w-[15%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Assigned</div>
                <div className="delivered w-[15%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Delivered</div>
                <div className="payment w-[15%] h-[100%] rounded-md flex justify-start pl-2 bg-white text-gray-900 border-1 items-center text-[14px] font-bold">Payment</div>

            </div>
            <div className="lower w-[95%] h-[90%] lg:h-[70%] flex flex-wrap gap-2 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>
                {myorderarr
                    .map(item => {
                        return (
                            <div key={item._id} className="w-[100%] flex-shrink-0 h-72 lg:h-12 lg:border-0 lg:bg-transparent bg-zinc-900 border-1 border-blue-500/40 shadow-[0_0_40px_rgba(0,0,0,0.25) flex lg:flex-row flex-col justify-evenly lg:justify-between items-center rounded-2xl lg:rounded-md">
                                <div className="productName w-[90%] lg:w-[26%] lg:bg-zinc-900 text-gray-300 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='text-gray-200 font-bold mr-4 flex lg:hidden'>Product name</span>{item.productName}</div>
                                <div className="productPrice w-[90%] lg:w-[25%] lg:bg-zinc-900 text-green-400 lg:border-1 lg:border-blue-500/40 rounded-md h-[100%] flex justify-start pl-2 hover:bg-zinc-700 items-center text-[15px]"><span className='text-gray-200 font-bold mr-4 flex lg:hidden'>Price</span>{item.productPrice}/-</div>
                                <div className="taken lg:border-blue-500/40 w-[90%] lg:w-[15%] h-[100%] rounded-md flex justify-start lg:pl-0 pl-2 lg:justify-center hover:bg-zinc-700 lg:bg-zinc-900 text-gray-900 lg:border-1 items-center text-[14px] font-bold"><span className='text-gray-200 font-bold mr-4 flex lg:hidden'>Assignment status</span><span className={`material-symbols-outlined ${item.taken ? 'text-green-500' : 'text-gray-400'
                                    }`}>check_circle</span></div>
                                <div className="delivered lg:border-blue-500/40 w-[90%] lg:w-[15%] h-[100%] rounded-md flex justify-start lg:pl-0 pl-2 lg:justify-center hover:bg-zinc-700 lg:bg-zinc-900 text-gray-900 lg:border-1 items-center text-[14px] font-bold"><span className='text-gray-200 font-bold mr-4 flex lg:hidden'>Delivery status</span><span className={`material-symbols-outlined ${item.delivered ? 'text-green-500' : 'text-gray-400'
                                    }`}>check_circle</span></div>
                                <div className="payment lg:border-blue-500/40 w-[90%] lg:w-[15%] h-[100%] rounded-md flex justify-start pl-2 hover:bg-zinc-700 lg:bg-zinc-900 text-gray-900 lg:border-1 items-center text-[14px] font-bold"><span className='text-gray-200 font-bold mr-4 flex lg:hidden'>Payment status</span>
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

export default MyOrders
