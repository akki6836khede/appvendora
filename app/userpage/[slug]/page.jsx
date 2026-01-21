"use client"

import React from 'react'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import getCustomerData from '@/actions/getCustomerProfile'
import CustomerProfile from '@/app/components/customerProfile'
import { useState } from 'react'
import { useEffect } from 'react'
import useSWR from "swr"
import getShopsList from '@/actions/getShopsList'
import Image from 'next/image'
import Products from '@/app/components/shopProducts'
import Cart from '@/app/components/cart'
import PaymentDialog from '@/app/components/paymentDialog'
import MyOrders from '@/app/components/myOrders'
import { CardStack } from '@/components/ui/card-stack'
import { CardStackImage } from '@/components/card-stack-image'
import PaymentSuccesful from '@/app/components/PaymentSuccesful'
import AboutComponent from '@/app/components/aboutPage'
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />


const page = () => {
    const [bool, setBool] = useState(false)
    const [profile, setProfile] = useState({})
    const [bool1, setBool1] = useState(false)
    const fetcher = async () => await getShopsList()
    const { data: shopsarr = [], error, isLoading } = useSWR("shops", fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    })
    console.log(shopsarr)
    useEffect(() => {
        let func = async () => {
            let prof = await getCustomerData()
            setProfile(prof)
        }
        func()
    }, [])
    const profileCheck = () => {
        setBool(prev => !prev)
    }

    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push("/login")
    }
    const router = useRouter()
    const [id, setId] = useState(1)

    const [bool2, setBool2] = useState(false)

    const [bool4, setBool4] = useState(false)
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [bool_m, setBool_m] = useState(false)
    const [boolm, setBoolm] = useState(false)

    const [content, setContent] = useState(1)
    const promoCards = [
        {
            id: 1,
            name: "Nearby Shops",
            designation: "Discover Local Stores",
            content:
                "🏪 Find and explore verified local shops around you. From groceries to daily essentials, everything is available in one place so you don’t have to visit each shop separately."
        },
        {
            id: 2,
            name: "Simple Ordering",
            designation: "Easy & Fast",
            content:
                "🛒 Add products to your cart, choose quantities, and place your order in just a few clicks. No complicated steps – simple and smooth ordering experience."
        },
        {
            id: 3,
            name: "Cash on Delivery",
            designation: "Flexible Payment",
            content:
                "💵 Pay only after your order is delivered. No need to worry about online payment failures – just pay in cash when your items reach your doorstep."
        }
    ];

    const shopImages = [
        { id: 1, image: "/slide1.jpg" },
        { id: 2, image: "/slide2.jpg" },
        { id: 3, image: "/slide3.jpg" },
        { id: 4, image: "/slide4.jpg" },
        { id: 5, image: "/slide5.jpg" },
        // { id: 6, image: "/slide10.jpg" }, 
    ];

    return (
        <div className="lg:w-full h-[100vh] w-[100vw] lg:min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative">
            <div className='w-[100%] lg:container h-screen mx-0 lg:mx-auto flex flex-col justify-evenly items-center'>
                <div className="nav w-full lg:w-[100%] h-[30%] md:h-[25%] border-b-1 border-gray-400 relative lg:hidden flex flex-col justify-evenly items-center">
                    {bool && <CustomerProfile image={profile.image} customerName={profile.customerName} customerContact={profile.customerContact} customerAddress={profile.customerAddress} landmark={profile.landmark} email={profile.email} bool={bool} setBool={setBool} profileCheck={profileCheck}></CustomerProfile>}
                    <div className="up w-[100%] flex justify-center md:justify-start items-center px-4">
                        <Image src="/FullLogo_Transparent.png" width={160} height={160} alt="pharma logo" />
                    </div>
                    <div className="up w-[95%] flex justify-between items-center">
                        <button className='w-25 md:w-30 h-8 bg-white rounded-md text-black hover:text-white hover:scale-103 font-bold' onClick={profileCheck}>Profile</button>
                        <button className='w-25 md:w-30 h-8 bg-white rounded-md text-black hover:text-white hover:scale-103 font-bold' onClick={handleLogout}>Logout</button>
                        <button className='w-25 md:w-30 h-8 bg-white rounded-md text-black hover:text-white hover:scale-103 font-bold' onClick={() => {
                            setContent(1)
                        }}>Home</button>
                    </div>
                    <div className="up w-[95%] flex justify-between items-center pb-4">
                        <button className='w-25 md:w-30 h-8 bg-white flex justify-center items-center rounded-md text-black hover:text-white hover:scale-103 font-bold' onClick={() => {
                            setContent(3)
                        }}>My cart</button>
                        <button className='w-25 md:w-30 h-8 bg-white rounded-md text-black hover:text-white hover:scale-103 font-bold' onClick={() => {
                            setContent(2)
                        }}>My orders</button>
                        <button className='w-25 md:w-30 h-8 bg-white rounded-md text-black hover:text-white hover:scale-103 font-bold' onClick={() => {
                            setContent(5)
                        }}>About</button>
                    </div>
                </div>
                <div className="nav w-[100%] h-[10%] border-b-1 border-gray-400 relative hidden lg:flex justify-start gap-20 items-center rounded-full">
                    {bool && <CustomerProfile image={profile.image} customerName={profile.customerName} customerContact={profile.customerContact} customerAddress={profile.customerAddress} landmark={profile.landmark} email={profile.email} bool={bool} setBool={setBool} profileCheck={profileCheck}></CustomerProfile>}
                    <Image src="/FullLogo_Transparent.png" width={160} height={160} alt="pharma logo" />
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={profileCheck}>Profile</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={handleLogout}>Logout</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={() => {
                        setContent(1)
                    }}>Home</button>
                    <button className='flex justify-center items-center rounded-full text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={() => {
                        setContent(3)
                    }}>My cart</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={() => {
                        setContent(2)
                    }}>My orders</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 font-bold' onClick={() => {
                        setContent(5)
                    }}>About</button>
                </div>
                <div className="lower w-[100%] h-[70%] md:h-[75%] lg:h-[90%] flex justify-between items-center relative">
                    {
                        content === 5 &&
                        <AboutComponent></AboutComponent>
                    }
                    {
                        content === 4 &&
                        <Products shopID={id} bool1={bool1} setBool1={setBool1}></Products>
                    }
                    {
                        content === 3 &&
                        <Cart setBool2={setBool2} bool2={bool2} bool4={bool4} setBool4={setBool4} total={total} setTotal={setTotal} cart={cart} setCart={setCart}></Cart>
                    }
                    {
                        bool4 &&
                        <PaymentDialog bool4={bool4} cart={cart} setBool4={setBool4} total={total} shopkeeperId={id} setTotal={setTotal} cust_email={profile.email} boolm={boolm} setBoolm={setBoolm}></PaymentDialog>
                    }
                    {
                        content === 2 &&
                        <MyOrders bool5={bool_m} setBool5={setBool_m}></MyOrders>
                    }
                    {
                        boolm &&
                        <PaymentSuccesful bool4={boolm} setBool4={setBoolm}></PaymentSuccesful>
                    }
                    {
                        content === 1 &&

                        <div className="lowerInner w-[100%] h-[100%] flex justify-center lg:justify-between items-center relative">
                            <div className='w-[50%] h-[95%] lg:flex flex-col hidden justify-evenly items-center'>
                                <CardStack items={promoCards} offset={5} scaleFactor={0.07} />
                                <CardStackImage
                                    items={shopImages}
                                    offset={5}
                                    scaleFactor={0.08}
                                />
                            </div>
                            <div className='w-[90%] lg:w-[40%] h-[95%] flex flex-col gap-0 md:gap-1 justify-start bg-black/50 rounded-2xl items-center overflow-y-scroll scrollbar-hide' style={{ scrollbarGutter: 'stable' }}>
                                {shopsarr
                                    .map(item => {
                                        return (
                                            <div key={item._id} className="w-[97%] h-50 flex shadow-[0_0_40px_rgba(0,0,0,0.25) border-1 border-zinc-600 flex-shrink-0 justify-evenly items-center bg-gradient-to-br mt-2 from-neutral-900 via-neutral-950 to-neutral-900 rounded-2xl text-amber-50" onClick={() => {
                                                setId(item._id)
                                                setBool1(prev => !prev);
                                                setContent(4)
                                            }}>
                                                <div className='w-[30%] h-50 flex justify-center items-start'>
                                                    <div className="w-[130px] mt-4 aspect-square rounded-full flex justify-center items-center relative">
                                                        <Image
                                                            src={item.shopImage}
                                                            alt="img"
                                                            fill
                                                            className="object-cover border-1 border-zinc-800 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-[70%] h-50 flex flex-col justify-evenly items-center' >
                                                    <div className='w-[88%] h-8 text-violet-600 font-bold text-xl'>{item.shopName}</div>
                                                    <div className='w-[88%] h-6 text-gray-400'>{item.shopCategory}</div>
                                                    <div className='w-[88%] h-6 text-gray-400'>Opens at {item.openingTime}</div>
                                                    <div className='w-[88%] h-6 text-gray-400'>Closes at {item.closingTime}</div>
                                                    <div className='w-[88%] h-6 overflow-x-hidden text-nowrap text-gray-400'>{item.shopAddress}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default page
/*
Array(1)
0
: 
closingTime
: 
"20:35"
createdAt
: 
"2025-12-21T10:00:24.299Z"
email
: 
"en23cs301219@medicaps.ac.in"
openingTime
: 
"21:35"
ownerContact
: 
"7466598773"
ownerName
: 
"Bill Machinson"
shopAddress
: 
"Atlanta, Fulton County, Georgia, United States"
shopCategory
: 
"clothing"
shopImage
: 
"https://res.cloudinary.com/drgvfdtx0/image/upload/v1766311223/shop_images/evkt3ngwvschyhbuxomb.jpg"
shopLatitude
: 
33.7544657
shopLongitude
: 
-84.3898151
shopName
: 
"Green Asthetics"
updatedAt
: 
"2025-12-21T10:00:24.299Z"
__v
: 
0
_id
: 
"6947c5389611c3a7c9df9f04"
[[Prototype]]
: 
Object
length
: 
1
[[Prototype]]
: 
Array(0)
*/