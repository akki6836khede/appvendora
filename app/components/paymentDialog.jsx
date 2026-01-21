import React from 'react'
import PayButton from './PayButton'
import { saveOrder } from '@/actions/saveOrderDetails'
import { emptyTheCart } from '@/actions/emptyCart'
import { mutate } from 'swr'
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />

const PaymentDialog = ({ bool4, setBool4, total, setTotal, shopkeeperId, cart, cust_email, boolm, setBoolm }) => {
    return (
        <div className='w-[90%] lg:w-[35%] h-[40%] rounded-xl bg-gradient-to-br from-blue-900 via-zinc-800 to-gray-900 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-52 flex flex-col justify-evenly items-center'>
            <div className='text-white font-bold'>Choose appropriate way to pay <span className='text-green-400'>{total}/-</span></div>
            <button className='font-bold text-white bg-gradient-to-r from-green-500 hover:scale-103 to-violet-700 hover:from-green-600 hover:to-violet-800 cursor-pointer w-45 h-10 rounded-md' onClick={async () => {
                await saveOrder(cart, shopkeeperId, false)
                await emptyTheCart(cart)
                mutate(["carts", { cust_email }])
                setBool4(prev => !prev)
                setBoolm(prev => !prev)
            }}>Cash on delivery</button>
            <PayButton className='font-bold text-white cursor-pointer bg-gradient-to-r from-green-500 hover:scale-103 to-violet-700 hover:from-green-600 hover:to-violet-800 w-45 h-10 rounded-md' total={total} cart={cart} shopkeeperId={shopkeeperId} customerPayment={true} cust_email={cust_email}>Pay now</PayButton>
            <button className='bg-red text-gray-300 flex justify-center items-center text-[15px] rounded-full w-8 h-8 bg-gray-200' onClick={() => {
                setBool4(prev => !prev)
            }}><span className="material-symbols-outlined !text-black !text-[17px] !font-bold">close</span></button>
        </div>
    )
}

export default PaymentDialog
