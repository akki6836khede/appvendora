"use client";
import React, { useEffect } from 'react'
import PayButton from './PayButton'
import { saveOrder } from '@/actions/saveOrderDetails'
import { emptyTheCart } from '@/actions/emptyCart'
import { mutate } from 'swr'

const PaymentSuccesful = ({ bool4, setBool4 }) => {

    useEffect(() => {
        if (!bool4) return;

        const timer = setTimeout(() => {
            setBool4(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [bool4, setBool4]);

    if (!bool4) return null;

    return (
        <div className='w-60 h-60 rounded-full bg-gradient-to-br from-green-700 via-green-400 to-green-600 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-52 flex flex-col justify-evenly items-center'>
            <span className="material-symbols-outlined !text-white !text-[50px] !font-bold">done_outline</span>
            <div className="1 font-bold text-gray-800">Order succesful!</div>
        </div>
    )
}

export default PaymentSuccesful