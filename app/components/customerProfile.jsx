import React from 'react'
import Image from 'next/image'

const CustomerProfile = (props) => {
  return (
    <div className='z-60 w-[95%] lg:w-130 h-70 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-black rounded-xl absolute top-4 left-2 flex justify-evenly items-center border-1 border-gray-300'>
      <div className="w-[20%] h-[95%] flex flex-col gap-8 justify-start items-center">
        <div className='font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-red-400 bg-clip-text text-transparent text-2xl'>Profile</div>
        <Image src={props.image} alt="img" width={60} height={60} className='rounded-full border-2 border-zinc-600'></Image>
      </div>
      <div className='w-[80%] flex flex-col justify-evenly items-center h-[95%]'>
        <div className="w-[90%] flex justify-end gap-2 items-center">
          <button className='w-8 h-8 rounded-full text-white flex justify-center items-center bg-gray-200' onClick={props.profileCheck}><span className="material-symbols-outlined !text-black !text-[17px] !font-bold">close</span></button>
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-300 mr-2">Name</span> {props.customerName}
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-400 mr-2">Contact</span> {props.customerContact}
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-400 whitespace-nowrap mr-2">Resident Address</span> <span className=' whitespace-nowrap overflow-x-scroll scrollbar-hide'>{props.customerAddress}</span>
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-400 mr-2">Landmark</span> {props.landmark}
        </div>
        <div className="w-[90%] flex text-gray-500 justify-start gap-2 items-center">
          <span className="font-bold text-gray-400 mr-2">Email</span> {props.email}
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile

// _id
// 690497fd6e74f201480a4d79

// ObjectId
// customerName
// Cartel Menonza

// String
// customerContact
// 8475666473

// String
// customerAddress
// Indore, Juni Indore Tahsil, इन्दौर ज़िला, Madhya Pradesh, 452001, India

// String
// customerLatitude
// 22.7203616

// Double
// customerLongitude
// 75.8681996

// Double
// landmark
// Dutta mandir rajendranagar

// String
// email
// trayambakam6836@gmail.com

// String
// createdAt
// 2025-10-31T11:05:33.779+00:00

// Date
// updatedAt
// 2025-10-31T11:05:33.779+00:00

// Date

// __v
0
