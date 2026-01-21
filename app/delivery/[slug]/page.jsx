"use client"
import React, { useEffect, useState } from 'react'
import getDeliveryProfile from '@/actions/getDeliveryPartnerProfile'
// import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react'
import DeliveryProfile from '@/app/components/deliveryProfile'
import AvailableOrders from '@/app/components/availableOrders'
import { useRouter } from 'next/navigation'
import { getAmount } from '@/actions/getCodAmount'
import Cod from '@/app/components/Cod'
import Image from 'next/image'
import AboutComponent from '@/app/components/aboutPage'

const page = () => {
  const [bool, setBool] = useState(false)
  const [profile, setProfile] = useState({})
  const router = useRouter()
  useEffect(() => {
    let func = async () => {
      let prof = await getDeliveryProfile()
      setProfile(prof)
    }
    func()
  }, [])
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }
  console.log(profile)
  const profileCheck = () => {
    setBool(prev => !prev)
  }
  const [bool1, setBool1] = useState(false);
  const [bool2, setBool2] = useState(false);
  const [total, setTotal] = useState(0);

  const [content, setContent] = useState(1)
  return (
    <div className="lg:w-full w-[100vw] lg:min-h-screen h-[100vh] flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative">
      <div className='w-[100%] lg:container h-screen mx-0 lg:mx-auto flex flex-col justify-evenly items-center'>
        <div className="nav w-full flex border-b-1 border-gray-400 relative lg:hidden md:h-[25%] h-[30%] flex-col justify-between items-center">
          {bool && <DeliveryProfile partnerName={profile.partnerName} deliveryContact={profile.deliveryContact} vehicleCategory={profile.vehicleCategory} baseAddress={profile.baseAddress} image={profile.image} email={profile.email} bool={bool} setBool={setBool} profileCheck={profileCheck}></DeliveryProfile>}
          <div className="up w-[100%] flex justify-center md:justify-start items-center">
            <Image src="/FullLogo_Transparent.png" width={160} height={160} alt="pharma logo" />
          </div>
          <div className="up w-[95%] flex justify-between items-center">
            <button className='rounded-md text-black bg-white md:w-30 w-25 h-8 hover:scale-103 font-bold' onClick={profileCheck}>Profile</button>
            <button className='rounded-md text-black bg-white md:w-30 w-25 h-8 hover:scale-103 font-bold' onClick={handleLogout}>Logout</button>
            <button className='rounded-md text-black bg-white md:w-30 w-25 h-8 hover:scale-103 font-bold' onClick={() => {
              setContent(1)
            }}>Orders</button>
          </div>
          <div className="up w-[95%] flex justify-between items-center pb-4">
            <button className='rounded-md text-black bg-white md:w-30 w-25 h-8 hover:scale-103 font-bold' onClick={async () => {
              const amt = await getAmount(profile.email)
              setTotal(amt.total)
              setContent(2)
            }}>Settle COD</button>
            <button className='rounded-md text-black bg-white md:w-30 w-25 h-8 hover:scale-103 font-bold' onClick={() => {
              setContent(3)
            }}>About</button>
            <button className='rounded-md md:w-30 w-25 hover:scale-103 font-bold h-8'></button>
          </div>
        </div>
        <div className="nav w-[100%] h-[10%] border-b-1 border-gray-400 relative hidden lg:flex justify-start gap-20 items-center rounded-full">
          {bool && <DeliveryProfile partnerName={profile.partnerName} deliveryContact={profile.deliveryContact} vehicleCategory={profile.vehicleCategory} baseAddress={profile.baseAddress} image={profile.image} email={profile.email} bool={bool} setBool={setBool} profileCheck={profileCheck}></DeliveryProfile>}
          <Image src="/FullLogo_Transparent.png" width={160} height={160} alt="pharma logo" />
          <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={profileCheck}>Profile</button>
          <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={handleLogout}>Logout</button>
          <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={() => {
            setContent(1)
          }}>Available orders</button>
          <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={async () => {
            const amt = await getAmount(profile.email)
            setTotal(amt.total)
            setContent(2)
          }}>Settle COD</button>
          <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={() => {
            setContent(3)
          }}>About</button>
        </div>
        <div className="lower w-[100%] md:h-[75%] h-[70%] lg:h-[90%] flex justify-center items-center relative">
          {
            content === 1 &&
            <AvailableOrders bool5={bool1} setBool5={setBool1}></AvailableOrders>
          }
          {
            content === 2 &&
            <Cod bool4={bool2} setBool4={setBool2} total_a={total} email={profile.email}></Cod>
          }
          {
            content === 3 &&
            <AboutComponent></AboutComponent>
          }
        </div>
      </div>
    </div>
  )
}

export default page
