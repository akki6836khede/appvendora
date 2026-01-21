import React from 'react'
import Image from 'next/image'

const DeliveryProfile = (props) => {
  return (
    <div className='z-60 w-[95%] lg:w-130 h-70 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-black rounded-xl absolute top-4 left-2 flex justify-evenly items-center border-1 border-gray-700'>
      <div className="w-[20%] h-[95%] flex flex-col gap-8 justify-start items-center">
        <div className='font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-red-400 bg-clip-text text-transparent text-2xl'>Profile</div>
        <Image src={props.image} alt="img" width={60} height={60} className='rounded-full border-2 border-zinc-600'></Image>
      </div>
      <div className='w-[80%] flex flex-col justify-evenly items-center h-[95%]'>
        <div className="w-[90%] flex text-gray-500 justify-end gap-2 items-center">
          <button className='w-8 h-8 rounded-full text-white flex justify-center items-center bg-gray-200' onClick={props.profileCheck}><span className="material-symbols-outlined !text-black !text-[17px] !font-bold">close</span></button>
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-300 mr-2">Name</span> {props.partnerName}
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-300 mr-2">Contact</span> {props.deliveryContact}
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-300 mr-2">Vehicle Category</span> {props.vehicleCategory}
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-300 whitespace-nowrap mr-2">Resident Address</span> <span className=' whitespace-nowrap overflow-x-scroll scrollbar-hide'>{props.baseAddress}</span>
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-300 mr-2">Email</span> {props.email}
        </div>
      </div>
    </div>
  )
}

export default DeliveryProfile
