import React from 'react'
import { updateStockOrPrice } from '@/actions/updatestock_changeprice'
import { mutate } from 'swr'
import Form from 'next/form'

const ChangeStock = ({ _id, setShowAdder }) => {
    const handleSubmit = async (formData) => {
        const result = await updateStockOrPrice(formData, "stock");
        if (result.succes) {
            const ORDER_KEYS = new Set([
                "myproducts",
                "products"
            ]);

            mutate(key => Array.isArray(key) && ORDER_KEYS.has(key[0]));
            setShowAdder(prev => !prev);
        }
    }
    return (
        <Form
            action={handleSubmit}
            className='w-[50%] lg:w-[30%] h-[40%] rounded-xl bg-black/40 backdrop-blur-sm absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-52 flex flex-col justify-evenly items-center'
        >
            <input type="hidden" name="_id" value={_id} />

            <input type="number" name="stock" placeholder='Enter stock here' className='w-[70%] h-10 rounded-md bg-gray-800 text-gray-300 border-1 flex justify-center items-center px-2' />

            <button type='submit' className='w-30 h-8 flex justify-center items-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-700 text-white font-bold'>
                Change Stock
            </button>
        </Form>
    )
}

export default ChangeStock

