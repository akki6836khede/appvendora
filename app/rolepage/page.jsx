"use client"

import React from 'react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { saveUserToDB } from "@/actions/saveuser"
import { signOut } from 'next-auth/react'
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />

const page = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <p>Loading...</p>
  }
  
  if (!session) {
    return <p>Not signed in</p>
  }
  const { email, name, image } = session.user
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-black'>
      <div className="left w-[60%] h-screen bg-[url('/generated-image.png')] bg-cover bg-center"></div>
      <div className="right w-[40%] h-screen flex flex-col gap-8 justify-start items-center">
        <div className="upper w-[97%] h-[20%] flex justify-start items-center">
          <Image src="/FullLogo_Transparent.png" width={200} height={200} alt="pharma logo" />
        </div>
        <div className="lower w-[77%] h-[60%] text-white flex flex-col justify-evenly items-center">
          <div className='w-[100%] h-[10%] text-xl font-bold '><span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                bg-clip-text text-transparent italic'>Select your role</span></div>
          <div className='w-[100%] h-[25%] flex flex-col justify-evenly items-center rounded-xl bg-gradient-to-r from-zinc-800/70 to-zinc-800/50 hover:from-zinc-800/80 hover:to-zinc-800/60 hover:scale-[1.02] transition-all duration-300 cursor-pointer' onClick={async()=>{
            const role = "shopkeeper"
            const res = await saveUserToDB({ name, email, image, role})
            router.push(`/shopkeeperForm`)
          }}>
            <div className="icon w-[90%]">
              <span className="material-symbols-outlined !text-amber-500">
                storefront
              </span>
            </div>
            <div className="description italic w-[90%]">
              <span className='font-bold text-amber-300'>Shop Owner</span> – Grow your business and reach new customers.
            </div>
          </div>
          <div className='w-[100%] h-[25%] flex flex-col justify-evenly items-center rounded-xl bg-gradient-to-r from-zinc-800/70 to-zinc-800/50 hover:from-zinc-800/80 hover:to-zinc-800/60 hover:scale-[1.02] transition-all duration-300 cursor-pointer' onClick={async()=>{
            const role = "customer"
            const res = await saveUserToDB({ name, email, image, role})
            router.push(`/userform`)
          }}>
            <div className="icon w-[90%]">
              <span className="material-symbols-outlined !text-blue-500">
                contacts_product
              </span>
            </div>
            <div className="description italic w-[90%]">
              <span className='font-bold text-blue-300'>Customer</span> – Discover and shop from trusted local stores near you.
            </div>
          </div>
          <div className='w-[100%] h-[25%] flex flex-col justify-evenly items-center rounded-xl bg-gradient-to-r from-zinc-800/70 to-zinc-800/50 hover:from-zinc-800/80 hover:to-zinc-800/60 hover:scale-[1.02] transition-all duration-300 cursor-pointer' onClick={async()=>{
            const role = "deliverypartner"
            const res = await saveUserToDB({ name, email, image, role})
            router.push(`/deliveryform`)
          }}>
            <div className="icon w-[90%]">
              <span className="material-symbols-outlined !text-green-500">
                delivery_truck_bolt
              </span>
            </div>
            <div className="description italic w-[90%]">
              <span className='font-bold text-green-300'>Delivery Partner</span> – Deliver local orders and earn with Vendora.
            </div>
          </div>
          <button onClick={()=>{
              signOut()
              router.push(`/login`)
          }}>logout</button>
        </div>
      </div>
    </div>
  )
}

export default page
