"use client"
import React, { useState } from 'react'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"
import Orders from '@/app/components/orders';
import Sales from '@/app/components/shopkeeperSales';
import getShopkeeperProfile from '@/actions/getShopkeeperProfile';
import { useEffect } from 'react';
import ShopkeeperProfile from '@/app/components/shopkeeperProfile';
import AddProduct from '@/app/components/addProduct';
import Image from 'next/image';
import AboutComponent from '@/app/components/aboutPage'
import MyProducts from '@/app/components/myProducts';


const page = () => {
    const [profile, setProfile] = useState({})
    const [bool, setBool] = useState(false)
    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push("/login")
    }
    const router = useRouter()
    useEffect(() => {
        let func = async () => {
            let prof = await getShopkeeperProfile()
            setProfile(prof)
        }
        func()
    }, [])
    const [bool5, setBool5] = useState(false)
    const [bool3, setBool3] = useState(false)
    const [booladd, setBooladd] = useState(false)

    const [content, setContent] = useState(1)

    const profileCheck = () => {
        setBool(prev => !prev)
    }
    return (
        <div className="lg:w-full h-[100vh] w-[100vw] lg:min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative">
            <div className='w-[100%] lg:container h-screen mx-0 lg:mx-auto flex flex-col justify-between lg:justify-evenly items-center'>
                <div className="nav w-full lg:w-[100%] md:h-[25%] h-[30%] border-b-1 border-gray-400 relative flex lg:flex-row flex-col lg:hidden justify-between lg:justify-start items-center lg:rounded-full">
                    {bool && <ShopkeeperProfile image={profile.image} shopName={profile.shopName} ownerName={profile.ownerName} shopAddress={profile.shopAddress} shopCategory={profile.shopCategory} email={profile.email} openingTime={profile.openingTime} closingTime={profile.closingTime} bool={bool} setBool={setBool} profileCheck={profileCheck} ownerContact={profile.ownerContact}></ShopkeeperProfile>}
                    <div className="up w-[100%] flex justify-center md:justify-start items-center">
                        <Image src="/FullLogo_Transparent.png" width={160} height={160} alt="pharma logo" />
                    </div>
                    <div className="up w-[95%] flex justify-between items-center">
                        <button className='rounded-md text-black w-20 md:w-30 bg-white h-8 hover:scale-103 lg:font-bold' onClick={profileCheck}>Profile</button>
                        <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={handleLogout}>Logout</button>
                        <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={() => {
                            setContent(3)
                        }}>+ Product</button>
                        <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={() => {
                            setContent(1)
                        }} >
                            Orders</button>
                    </div>
                    <div className="up w-[95%] flex justify-between items-center pb-4">
                        <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={() => {
                            setContent(2)
                        }} >
                            Sales</button>
                        <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={() => {
                            setContent(5)
                        }}>Products</button>
                        <button className='rounded-md w-20 md:w-30 bg-white h-8 text-black hover:scale-103 lg:font-bold' onClick={() => {
                            setContent(4)
                        }}>About</button>
                        <button className='rounded-md w-20 md:w-30 h-8 text-gray-200 blackxt-white hover:scale-103 lg:font-bold'>
                        </button>
                    </div>

                </div>
                <div className="nav w-full lg:w-[100%] h-[10%] border-b-1 border-gray-400 relative hidden lg:flex justify-start gap-20 items-center lg:rounded-full">
                    {bool && <ShopkeeperProfile image={profile.image} shopName={profile.shopName} ownerName={profile.ownerName} shopAddress={profile.shopAddress} shopCategory={profile.shopCategory} email={profile.email} openingTime={profile.openingTime} closingTime={profile.closingTime} bool={bool} setBool={setBool} profileCheck={profileCheck} ownerContact={profile.ownerContact}></ShopkeeperProfile>}
                    <Image src="/FullLogo_Transparent.png" width={160} height={160} alt="pharma logo" />
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 lg:font-bold' onClick={profileCheck}>Profile</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 lg:font-bold' onClick={handleLogout}>Logout</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 lg:font-bold' onClick={() => {
                        setContent(3)
                    }}>Add Product</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 lg:font-bold' onClick={() => {
                        setContent(1)
                    }} >
                        Orders</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 lg:font-bold' onClick={() => {
                        setContent(2)
                    }} >
                        Sales</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 lg:font-bold' onClick={() => {
                        setContent(5)
                    }}>Products</button>
                    <button className='rounded-md text-gray-200 hover:text-white hover:scale-103 lg:font-bold' onClick={() => {
                        setContent(4)
                    }}>About</button>

                </div>
                <div className="lower w-[100%] h-[70%] md:h-[75%] lg:h-[90%] flex justify-center items-center relative">
                    {
                        content === 1 &&
                        <Orders bool5={bool5} setBool5={setBool5}></Orders>
                    }
                    {
                        content === 2 &&

                        <Sales bool5={bool3} setBool5={setBool3}></Sales>
                    }
                    {
                        content === 3 &&
                        <AddProduct bool={booladd} setBool={setBooladd}></AddProduct>
                    }
                    {
                        content === 4 &&
                        <AboutComponent></AboutComponent>
                    }
                    {
                        content === 5 &&
                        <MyProducts shopID={profile._id}></MyProducts>
                    }
                </div>
            </div>
        </div>
    )
}

export default page
{/* <button onClick={handleLogout}>Signout</button> */ }