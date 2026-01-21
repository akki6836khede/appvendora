import React from 'react'
import Image from 'next/image'

const ShopkeeperProfile = (props) => {
    return (
        <div className='z-60 w-[95%] lg:w-130 h-90 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-black rounded-xl absolute top-4 left-2 flex justify-evenly items-center border-1 border-gray-700'>
            <div className="w-[20%] h-[95%] flex flex-col gap-8 justify-start items-center">
                <div className='font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-red-400 bg-clip-text text-transparent text-2xl'>Profile</div>
                <Image src={props.image} alt="img" width={60} height={60} className='rounded-full border-2 border-zinc-600'></Image>
            </div>
            <div className='w-[80%] flex flex-col justify-evenly text-gray-500 items-center h-[95%]'>
                <div className="w-[90%] flex text-gray-500 justify-end gap-2 items-center">
                    <button className='w-8 h-8 rounded-full text-white flex justify-center items-center bg-gray-200' onClick={props.profileCheck}><span className="material-symbols-outlined !text-black !text-[17px] !font-bold">close</span></button>
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300">Shop name:-</span> {props.shopName}
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300">Owner name:-</span> {props.ownerName}
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300">Shop name:-</span> {props.shopCategory}
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300 whitespace-nowrap">Shop Address:-</span> <span className=' whitespace-nowrap overflow-x-scroll scrollbar-hide'>{props.shopAddress}</span>
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300">Contact:-</span> {props.ownerContact}
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300">Email:-</span> {props.email}
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300">Opening time:-</span> {props.openingTime}
                </div>
                <div className="w-[90%] flex justify-start text-gray-500 gap-2 items-center">
                    <span className="font-bold text-gray-300">Closing time:-</span> {props.closingTime}
                </div>
            </div>
        </div>
    )
}

export default ShopkeeperProfile