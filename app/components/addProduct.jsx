"use client"

import React from 'react'
import Form from 'next/form'
import { saveProduct } from '@/actions/saveProduct'

const AddProduct = ({ bool, setBool }) => {
    return (
        <div className='w-[90%] h-[70%] md:w-[60vw] lg:w-[40vw] md:h-[40vh] lg:h-[60vh] rounded-4xl absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/70 flex flex-col justify-evenly items-center'>
            <div className='w-full h-[20%] flex justify-center items-center text-3xl font-bold 
                bg-gradient-to-r from-blue-300 via-violet-300 to-red-300 
                bg-clip-text text-transparent'>
                Add a Product
            </div>
            <Form action={saveProduct} className='w-[100%] h-[80%] flex flex-col justify-evenly items-center'>
                <input type="text" name='productName' placeholder='Enter product name here' className='w-[70%] h-10 rounded-lg border-1 border-gray-200 text-zinc-200 pl-2 font-bold flex justify-center items-center' />
                <input type="number" name='productPrice' placeholder='Enter product price here' className='w-[70%] h-10 rounded-lg border-1 border-gray-200 pl-2 text-zinc-200 font-bold flex justify-center items-center' />
                <input type="number" name='productStock' placeholder='Enter product stock here' className='w-[70%] h-10 rounded-lg border-1 border-gray-200 pl-2 text-zinc-200 font-bold flex justify-center items-center' />
                <input
                    type="file"
                    accept="image/*"
                    name="shopImage"
                    className="w-[70%] h-20 px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                <button type='submit' className='w-30 h-10 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white rounded-lg flex justify-center items-center font-bold'>Add product</button>
            </Form>
        </div>
    )
}

export default AddProduct