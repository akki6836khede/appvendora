import React from 'react'
import PayButton from './PayButton'
import { saveOrder } from '@/actions/saveOrderDetails'

const Cod = ({ bool4, setBool4, total_a, email }) => {
    return (
        <div className='w-[70%] lg:w-[30%] h-[40%] rounded-xl bg-black/95 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-52 flex flex-col justify-evenly items-center'>
            <div className="amount text-gray-300 w-60 flex justify-center items-center text-xl h-10">
                Total COD Amount:<span className='pl-3 font-bold text-green-500'>{total_a}</span>
            </div>
            <PayButton className='bg-gradient-to-r from-green-500 font-bold hover:scale-103 to-violet-700 text-white cursor-pointer hover:from-green-600 hover:to-violet-800 w-45 h-10 rounded-md' total={total_a} customerPayment={false} email={email}>Pay now</PayButton>
            <div className="amount text-blue-500 w-60 flex justify-center items-center h-10">
                Settle COD amounts on time
            </div>
        </div>
    )
}

export default Cod




{/* <div className='text-white font-bold'>Choose appropriate way to pay <span className='text-green-400'>{total}/-</span></div>
            <button className='bg-gradient-to-r from-gray-200 font-bold to-zinc-600 text-black cursor-pointer hover:from-gray-400 hover:to-zinc-800 w-40 h-8 rounded-md' onClick={async () => {
                await saveOrder(cart, shopkeeperId, false)
            }}>Cash on delivery</button>
            <PayButton className='bg-gradient-to-r from-gray-200 font-bold to-zinc-600 text-black cursor-pointer hover:from-gray-400 hover:to-zinc-800 w-40 h-8 rounded-md' total={total} cart={cart} shopkeeperId={shopkeeperId}>Pay now</PayButton>
             */}